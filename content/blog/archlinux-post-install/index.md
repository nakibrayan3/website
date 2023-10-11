---
title: "Archlinux Post Install Guide"
date: 2023-05-25
tags: [ guide, archlinux ]
---

## 1. Install Drivers

### 1.1 Network/Wireless

1. Check the driver status

To check if the driver for your card has been loaded, check the output of the `lspci -k` or `lsusb -v` command, depending on if the card is connected by `PCI(e)` or `USB`. You should see that some kernel driver is in use, for example:

```text
$ lspci -k
```

```text
06:00.0 Network controller: Intel Corporation WiFi Link 5100
	Subsystem: Intel Corporation WiFi Link 5100 AGN
	Kernel driver in use: iwlwifi
	Kernel modules: iwlwifi
```

**Note**: If the card is a USB device, running `dmesg | grep usbcore` as root should give something like `usbcore: registered new interface driver rtl8187` as output.

Also check the output of the `ip link` command to see if a wireless interface was created; usually the naming of the wireless network interfaces starts with the letter "w", e.g. `wlan0` or `wlp2s0`. Then bring the interface up with:

```text
# ip link set interface up
```

**Note:**

- If you get errors like `RTNETLINK answers: Operation not possible due to RF-kill`, make sure that the device is not hard-blocked or soft-blocked. See [#Rfkill caveat](#) for details.
- If you get the error message `SIOCSIFFLAGS: No such file or directory`, it most certainly means that your wireless chipset requires a firmware to function.

Check kernel messages for firmware being loaded:

```text
# dmesg | grep firmware
```

```text
[   7.148259] iwlwifi 0000:02:00.0: loaded firmware version 39.30.4.1 build 35138 op_mode iwldvm
```

If there is no relevant output, check the messages for the full output for the module you identified earlier (`iwlwifi` in this example) to identify the relevant message or further issues:

```text
# dmesg | grep iwlwifi
```

```text
[   12.342694] iwlwifi 0000:02:00.0: irq 44 for MSI/MSI-X
[   12.353466] iwlwifi 0000:02:00.0: loaded firmware version 39.31.5.1 build 35138 op_mode iwldvm
[   12.430317] iwlwifi 0000:02:00.0: CONFIG_IWLWIFI_DEBUG disabled
...
[   12.430341] iwlwifi 0000:02:00.0: Detected Intel(R) Corporation WiFi Link 5100 AGN, REV=0x6B
```

If the kernel module is successfully loaded and the interface is up, you can skip the next section.

2. Installing driver/firmware

Check the following lists to discover if your card is supported:

- See the table of [existing Linux wireless drivers](https://wireless.wiki.kernel.org/en/users/drivers) and follow to the specific driver's page, which contains a list of supported devices.
- The [Ubuntu Wiki](https://help.ubuntu.com/community/WifiDocs/WirelessCardsSupported) has a good list of wireless cards and whether or not they are supported either in the Linux kernel or by a user-space driver (includes driver name).
- The Linux Questions' [Hardware Compatibility List](https://web.archive.org/web/20110711100256/http://www.linuxquestions.org/hcl/index.php?cat=10) (HCL) also have a good database of kernel-friendly hardware.

Note that some vendors ship products that may contain different chip sets, even if the product identifier is the same. Only the usb-id (for USB devices) or pci-id (for PCI devices) is authoritative.

If your wireless card is not listed above, it is likely supported only under Windows (some Broadcom, 3com, etc). For these, you can try to use [#ndiswrapper](#).

Now search for driver in the archlinux repos

```text
$ pacman -Ss driver_name
```

and install the appropriate package

### 1.2 Rfkill caveat

Many laptops have a hardware button (or switch) to turn off the wireless card however, the card can also be blocked by the kernel. This can be handled by rfkill. To show the current status:

```text
# rfkill
```

```text
ID TYPE      DEVICE      SOFT      HARD
 0 bluetooth hci0   unblocked unblocked
 1 wlan      phy0   unblocked unblocked
```

If the card is hard-blocked, use the hardware button (switch) to unblock it. If the card is not hard-blocked but soft-blocked, use the following command:

```text
# rfkill unblock wlan
```

### 1.3 ndiswrapper

Ndiswrapper is a wrapper script that allows you to use some Windows drivers in Linux. You will need the .inf and .sys files from your Windows driver.

**Note**: Be sure to use drivers appropriate to your architecture (x86 vs. x86_64).

**Tip**: If you need to extract these files from an .exe file, you can use `cabextract`.

Follow these steps to configure ndiswrapper.

1. Install `ndiswrapper-dkms`.

2. Install the driver to `/etc/ndiswrapper/`:

```text
# ndiswrapper -i filename.inf
```

3. List all installed drivers for ndiswrapper:

```text
$ ndiswrapper -l
```

4. Let ndiswrapper write its configuration in `/etc/modprobe.d/ndiswrapper.conf`:

```text
# ndiswrapper -m
# depmod -a
```


5. The ndiswrapper install is almost finished; you can load the module at boot.

Today, all necessary modules loading is handled automatically by udev, so if you do not need to use any out-of-tree kernel modules, there is no need to put modules that should be loaded at boot in any configuration file. However, there are cases where you might want to load an extra module during the boot process, or blacklist another one for your computer to function properly.

- systemd

create the file `/etc/modules-load.d/ndiswrapper.conf` and add this line.

```text
ndiswrapper
```

6. Test that ndiswrapper will load now:

```text
# modprobe ndiswrapper
# iwconfig
```

### 1.2 NVIDIA

**Warning**: Avoid installing the NVIDIA driver through the package provided from the NVIDIA website. Installation through pacman allows upgrading the driver together with the rest of the system.

These instructions are for those using the stock `linux` or `linux-lts` packages.

1. If you do not know what graphics card you have, find out by issuing:

```text
$ lspci -k | grep -A 2 -E "(VGA|3D)"
```

2. Determine the necessary driver version for your card by:

- Visiting [NVIDIA's driver download site](https://www.nvidia.com/Download/index.aspx) and using the dropdown lists.
- Finding the code name (e.g. NV50, NVC0, etc.) on [nouveau wiki's code names page](https://nouveau.freedesktop.org/wiki/CodeNames/) or [nouveau's GitLab](https://gitlab.freedesktop.org/nouveau/wiki/-/blob/master/sources/CodeNames.mdwn), then looking up the name in [NVIDIA's legacy card list](https://www.nvidia.com/en-us/drivers/unix/legacy-gpu/): if your card is not there you can use the latest driver.

3. Install the appropriate driver for your card:

- For the Maxwell [(NV110/GMXXX)](https://nouveau.freedesktop.org/CodeNames.html#NV110) series and newer, install the `nvidia` package (for use with the linux kernel) or `nvidia-lts` (for use with the linux-lts kernel) package.
    - If these packages do not work, `nvidia-beta`<sup>AUR</sup> may have a newer driver version that offers support.

- Alternatively for the [Turing (NV160/TUXXX)](https://nouveau.freedesktop.org/CodeNames.html#NV160) series or newer the `nvidia-open` package may be installed for open source kernel modules on the linux kernel (On other kernels `nvidia-open-dkms` must be used). 
    - This is currently alpha quality on desktop cards, so there will be issues. Due to [nvidia-open issue #282](https://github.com/NVIDIA/open-gpu-kernel-modules/issues/282), it does not work on systems that have AMD integrated GPUs.

- For the [Kepler (NVE0/GKXXX)](https://nouveau.freedesktop.org/CodeNames.html#NVE0) series, install the `nvidia-470xx-dkms`<sup>AUR</sup> package.

**Note**: 470xx and older drivers may not function correctly on Linux 5.18 (or later) on systems with Intel CPUs 11th Gen and newer due an incompatibility with [Indirect Branch Tracking](https://edc.intel.com/content/www/us/en/design/ipla/software-development-platforms/client/platforms/alder-lake-desktop/12th-generation-intel-core-processors-datasheet-volume-1-of-2/007/indirect-branch-tracking). You can disable it by setting the `ibt=off` [kernel parameter](https://wiki.archlinux.org/title/Kernel_parameter) from the boot loader. Be aware, this security feature is responsible for [mitigating a class of exploit techniques](https://lwn.net/Articles/889475).

- For even older cards, use the nouveau driver by installing the `mesa` package.

4. Remove `kms` from the `HOOKS=()` array in `/etc/mkinitcpio.conf` and regenerate the initramfs with the command:

```text
# mkinitcpio -P
```

This will prevent the initramfs from containing the nouveau module making sure the kernel cannot load it during early boot.

5. Reboot

## 2. Install A Desktop Environment

if you don't know what to chose, just chose `gnome`

### 2.1 Gnome

```text
$ sudo pacman -S gnome
```

```text
$ sudo systemctl enable gdm.service
```

```text
$ reboot
```

### 2.2 KDE plasma

```text
$ sudo pacman -S plasma
```

```text
$ systemctl enable sddm.service
```

```text
$ reboot
```

### 2.3 xfce4

```text
$ sudo pacman -S xfce4 sddm
```

```text
$ systemctl enable sddm.service
```

```text
$ reboot
```

## 3 Install flatpak

```text
$ sudo pacman -S flatpak
```

## 4 Install An AUR Helper

```text
$ sudo pacman -S git rustup
```

```text
$ rustup toolchain install stable
```

```text
$ git clone https://aur.archlinux.org/paru.git
```

```text
$ cd paru
```

```text
$ makepkg -si
```

## 5. install and setup ntp

```text
$ sudo pacman -S ntp
```

```text
$ timedatectl set-ntp true
```

## 6. Sources

- [ArchLinux Wiki: Network configuration/Wireless](https://wiki.archlinux.org/title/Network_configuration/Wireless)
- [ArchLinux Wiki: NVIDIA](https://wiki.archlinux.org/title/NVIDIA)

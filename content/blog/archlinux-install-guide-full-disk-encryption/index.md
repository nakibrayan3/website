---
title: "Archlinux Install Guide With Full Disk Encryption"
date: 2023-05-19
tags: [ guide, archlinux ]
---

## 1. Pre installation

### 1.1 Download the Arch Linux ISO

Visit the [Download](https://archlinux.org/download/) page and acquire the ISO
file, and the respective GnuPG signature. 

### 1.2 Verify signature

It is recommended to verify the image signature before use, especially when
downloading from an HTTP mirror.

On a system with `GnuPG` installed, you can verify the image signature by
downloading the ISO PGP signature
[under Checksums in the Download page](https://archlinux.org/download/#checksums)
and verifying it with

```text
$ gpg --keyserver-options auto-key-retrieve --verify archlinux-version-x86_64.iso.sig
```

### 1.3 Create a Bootable USB of Arch Linux

You will need a USB of at least 2GB, after that visit the
[Etcher](https://etcher.balena.io/#download-etcher) page and install the
program.

{{< figure src="etcher-screenshot.webp" alt="Etcher Screenshot" width="788" height="470" >}}

in Etcher under `Select Image` chose the Arch Linux ISO you downloaded
previously, and under `Select Drive` chose the USB that you want to install
Arch Linux to.

**NOTE**: this prosess will erase all the data in the USB so make sure to:

1. back up all the data inside the USB.

2. select the right USB to flash the ISO to.

### 1.4 Boot from the live USB

**Note**: Arch Linux installation images do not support `Secure Boot`.
You will need to disable Secure Boot to boot the installation medium.
If desired, Secure Boot can be set up after completing the installation.

1. Point the current boot device to the one which has the Arch Linux
installation medium. Typically it is achieved by pressing F2, F10 or F12 key
(depending upon your system), Refer to your motherboard's manual for details.

2. When the installation medium's boot you will see a menu like this:

{{< figure src="archlinux-boot-menu.jpg" alt="arch linux iso boot menu" width="474" height="355" >}}

Select `Boot Arch Linux (x86_64)` (the fist option) and press kbd>Enter</kbd>
to enter the installation environment. 

### 1.5 Set keyboard layout

if your keyboard layout is `en-us` skip this part

The Available Keyboard layouts can be listed with

```text
# ls /usr/share/kbd/keymaps/**/*.map.gz
```

To set a keyboard layout, pass a corresponding file name to `loadkeys`,
omitting path and file extension. For example, to set a German keyboard layout:  

```text
# loadkeys de-latin1
```

### 1.6 Verify the boot mode

To verify the boot mode, list the `efivars` directory

```text
# ls /sys/firmware/efi/efivars
```

If the command shows the directory without error, then the system is booted in
UEFI mode. If the directory does not exist, the system may be booted in BIOS
(or CSM) mode.

Unfortunately This Guide is only for systems with `UEFI` mode, if you have
another boot mode this guide won't work.

### 1.7 Connect to the internet

To set up a network connection in the live environment, go through the
following steps:

1. Ensure your network interface is listed and enabled, with `ip-link`

```text
# ip link
```

For wireless and WWAN, make sure the card is not blocked with rfkill.

Many laptops have a hardware button (or switch) to turn off the wireless card
however, the card can also be blocked by the kernel. This can be handled by
rfkill. To show the current status:

```text
# rfkill
```

```text
ID TYPE      DEVICE      SOFT      HARD
 0 bluetooth hci0   unblocked unblocked
 1 wlan      phy0   unblocked unblocked
```

If the card is hard-blocked, use the hardware button (switch) to unblock it.
If the card is not hard-blocked but soft-blocked, use the following command:

```text
# rfkill unblock wlan
```

2. Connect to the network

- with Ethernet plug in the cable.

- or wifi using the iwctl command

To connect to wifi, First you need to get in the `iwctl` interactive prompt with

```text
# iwctl
```

and then list the wifi devices with


```text
[iwd]# device list
```

```text
                                Devices                               *
-----------------------------------------------------------------------
  Name                Address           Powerd   Adapter   Mode
-----------------------------------------------------------------------
  wlan0               ************      on       phy0      station
```

If the device or its corresponding adapter is turned off, turn it on

```text
[iwd]# device device set-property Powered on
```

```text
[iwd]# adapter adapter set-property Powered on
```

Then, initiate a scan for networks (note that this command will not output
anything)

```text
[iwd]# station device scan
```

You can then list all available networks

```text
[iwd]# station device get-networks
```

```text
                    Available networks                      *
-------------------------------------------------------------
   Network name                     Security     Signal
-------------------------------------------------------------
   **********                       ****         *****
   **********                       ****         *****
   **********                       ****         *****
   **********                       ****         *****
```

connect to a network

```text
[iwd]# station device connect SSID
```
Finally exit `iwctl`'s interactive prompt with

```text
[iwd]# exit
```

3. The connection may be verified with ping

```text
# ping nakibrayan2.pages.dev
```

### 1.8 Update the system clock

time will be synced automatically once a connection to the internet is
established, Use `timedatectl` to ensure the system clock is accurate

```text
# timedatectl
```

### 1.9 Partition the disks

When recognized by the live system, disks are assigned to a block device such
as `/dev/sda`, `/dev/nvme0n1` or `/dev/mmcblk0`. To identify these devices,
use lsblk

```text
# lsblk
```

Results ending in `rom`, `loop` or `airoot` may be ignored. 

**NOTE**: this prosess will erase all the data in the disk, so make sure to
back up all your data, and select the right disk to install the OS to.

to start enter to fdisk's interactive shell

```text
# fdisk /dev/the_disk_to_be_partitioned
```

1. create a new empty GPT partition table using the command `g`

```text
Command (m for help): g
```

2. create a EFI system partition with the command `n`

```text
Command (m for help): n
```

use defalut (leave empty)

```text
Partition number (1-128, default 1):
```

use defalut (leave empty)

```text
First sector (2048-234441614, default 2048):
```

here use `+512M`

```text
Last sector, +/-sectors or +/-size{K,M,G,T,P} (2048-234441614, default 234440703): +512M
```

if you are asked to remove the signature say yes

```text
Do you want to remove the signature? [Y]es/[N]o: y
```

3. set the partition type to EFI System using the `t` command

```text
Command (m for help): t
```

then select 1

```text
Partition type or alias (type L to list all): 1
```

4. now create another partition for root /

```text
Command (m for help): n
```

select default (leave empty)

```text
Partition number (2-128, default 2):
```

select default (leave empty)

```text
First sector (1050624-234441614, default 1050624):
```

select default (leave empty)

```text
Last sector, +/-sectors or +/-size{K,M,G,T,P} (1050624-234441614, default 234440703):
```

if you are asked to remove the signature say yes

```text
Do you want to remove the signature? [Y]es/[N]o: y
```

5. set the partition type to Linux filesystem using the `t` command

```text
Command (m for help): t
```

select the second partition 2

```text
Partition number (1,2, default 2): 2
```

then select 20

```text
Partition type or alias (type L to list all): 20
```

6. save the changes with the `w` command

```text
Command (m for help): w
```

7. quit

```text
Command (m for help): q
```

NOTE: Will create a swap file later

### 1.10 Encrypt root partition

the root Partition is `/dev/the_disk_partitioned2`, like `/dev/sda2`,
`/dev/nvme0n1p2` or `/dev/mmcblk0p2`.

1. encrypt the root partition

```text
# cryptsetup luksFormat /dev/the_root_partition2
```

```text
WARNING!
========
This will overwrite data on /dev/sda2 irrevocably.

Are you sure? (Type 'yes' in capital letters): YES
Enter passphrase for /dev/sda2: 
```

then type YES in capital letters, and type you password

2. open the encrypted partition and give it a name of cryptroot

```text
# cryptsetup luksOpen /dev/dev/the_root_partition2 cryptroot
```

### 1.11 Format the partitions

will use the ext4 file system for the root partition and fat32 fot the efi
system partition.

```text
# mkfs.ext4 /dev/mapper/cryptroot
```

the efi Partition is `/dev/the_disk_partitioned1`, like `/dev/sda1`,
`/dev/nvme0n1p1` or `/dev/mmcblk0p1`.

```text
# mkfs.fat -F 32 /dev/efi_system_partition
```

### 1.12 Mount the file systems

Mount the root volume to /mnt, and mount the EFI system partition to /mnt/boot.

```text
# mount /dev/mapper/cryptroot /mnt
```

```text
# mount --mkdir /dev/efi_system_partition /mnt/boot
```

## 2. Installation

### 2.1 Select the mirrors

reflector updates the mirror list by choosing 20 most recently synchronized HTTPS mirrors and sorting them by download rate to get faster download speeds.

```text
# reflector --latest 20 --protocol https --sort rate --save /etc/pacman.d/mirrorlist
```

### 2.2 update archlinux-keyring

To determine if packages are authentic, pacman uses GnuPG keys in a web of trust model, so we update the archlinux keyring to get the latest gpg keys and avoid errors when installing packages.

```text
# pacman -Sy archlinux-keyring
```

### 2.3 Install essential packages

Use the pacstrap script to install the base system.

- if you have an `intel` cpu use this command:

```text
# pacstrap -K /mnt base base-devel linux linux-firmware inte-ucode grub efibootmgr networkmanager man-db nano
```

- if you have an `amd` cup use this command:

```text
# pacstrap -K /mnt base base-devel linux linux-firmware amd-ucode grub efibootmgr networkmanager man-db nano
```

and install a text editor `nano` or `vim`.

## 3. Configure the system

### 3.1 Create swap file

if you have low ram lower then 12GB create a swap file double you ram size (or more then that).

if you have more then 12BG ram create the same swap size as your ram size, for exampe if you have 32BG ram create a 32BG swap file.

**NOTE**: swap is not necessary, but it's recommended if you have low ram or have a laptop and want to do hibernate, but if you don't have alot of disk space, or you are in a desktop computer and don't care about hibernation and have lot of ram (32BG plus) you don't have to create swap space.

1. Change root into the new system

```text
# arch-chroot /mnt
```

2. Use dd to create a swap file the size of your choosing. For example, creating an 8 GiB swap file

```text
# dd if=/dev/zero of=/swapfile bs=1G count=8 status=progress
```

3. Set the right permissions (a world-readable swap file is a huge local vulnerability)

```text
# chmod 0600 /swapfile
```

4. After creating the correctly sized file, format it to swap

```text
# mkswap -U clear /swapfile
```

5. Activate the swap file

```text
# swapon /swapfile
```

6. new exit

```text
exit
```

### 3.2 Fstab

an fstab file is used to mount all the partitions at boot

```text
# genfstab -U /mnt >> /mnt/etc/fstab
```


### 3.3 Chroot

Change root into the new system

```text
# arch-chroot /mnt
```

### 3.4 Time zone

```text
# ln -sf /usr/share/zoneinfo/Region/City /etc/localtime
```

Run hwclock to generate /etc/adjtime

```text
# hwclock --systohc
```

### 3.5 Localization

edit `/etc/locale.gen` and uncomment `en_US.UTF-8 UTF-8` and other needed locales. Generate the locales by running

```text
# locale-gen
```

Create the `/etc/locale.conf` file, and set the LANG variable accordingly

```text
LANG=en_US.UTF-8
```

If you set a keyboard layout, make the changes persistent in vconsole.conf by create the file `/etc/vconsole.conf` and adding your keyboard layout name to it

```text
KEYMAP=de-latin1
```

### 3.6 Network configuration

create the file `/etc/hostname`

```text
myhostname
```

enable NetworkManager

```text
# systemctl enable NetworkManager.service

```
### 3.7 Initramfs

edit the file `/etc/mkinitcpio.conf`, in the line were `HOOKS=()` add the option `encrypt` after the option `block`

old line:

```text
HOOKS=(base udev autodetect modconf kms keyboard keymap consolefont block filesystems fsck)
```

new line:

```text
HOOKS=(base udev autodetect modconf kms keyboard keymap consolefont block encrypt filesystems fsck)
```

and then run the command

```text
# mkinitcpio -P
```

### 3.8 Grub Boot loader

1. install grub

```text
# grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB
```

2. use `blkid` to get the encrypted partition's UUID

```text
/dev/sda2: UUID="********-****-****-****-************"
```

3. edit `/etc/default/grub`, and add the options bellow to the line `GRUB_CMDLINE_LINUX=""`, and change the `*` with the UUID of the encrypted partition.

```text
GRUB_CMDLINE_LINUX="cryptdevice=UUID=********-****-****-****-************:cryptroot root=/dev/mapper/cryptroot"
```

4. now update grub config

```text
# grub-mkconfig -o /boot/grub/grub.cfg
```

### 3.9 Set Root Password

```text
# passwd
```

### 3.10 create a user

to use the system you have to create a user to login to.

1. create a user and add it to the wheel group

```text
# useradd -m -G wheel your_username
```

2. allow the user to use sudo

replase `nano` with your editor of choise

```text
EDITOR=nano visudo
```

and uncomment the line

```text
%wheel ALL=(ALL:ALL) ALL
```

## 4 Reboot

now you you have basic archlinux install without a desktop envirment or any programs installed, i will have a [guide for Post-installation](/blog/archlinux-post-install) in the future.

now you have to exit the shell of the new system and then reboot

```text
exit
```

```text
reboot
```

Don't forget to set the boot device to the drive that have the archlinux installed in it.

## 5. Sources

- [ArchLinux Wiki: Install Guide](https://wiki.archlinux.org/title/Installation_guide)

- [ArchLinux Wiki: Network configuration/Wireless rfkill section](https://wiki.archlinux.org/title/Network_configuration/Wireless#Rfkill_caveat)

- [ARchLinux Wiki: Grub](https://wiki.archlinux.org/title/GRUB)

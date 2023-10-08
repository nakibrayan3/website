<!--
Copyright (C) Rayan Nakib
This file is part of website <https://codeberg.org/nakibrayan2/website>.

website is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

website config is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.
-->

---
title: "Backup and Restore GPG Key"
date: 2023-05-30
---

## 1. Electronic Backups

### 1.1 Backup

1. Determine which key to backup.

```text
$ gpg --list-secret-keys --keyid-format LONG
```

```text
/home/rayan/.local/share/gnupg/pubring.kbx
------------------------------------------
sec   rsa4096/BEBBEF4199FAB17B 2023-05-30 [SC]
      6BAD6CE934F697FD957D66ECBEBBEF4199FAB17B
uid                 [ultimate] test key <test.key@example.com>
ssb   rsa4096/573DFC84D89031BF 2023-05-30 [E]
```

2. Export the private GPG key.

```text
$ gpg -o private.gpg --export-options backup --export-secret-keys test.key@example.com
```

this command will export the key to the file `private.gpg`. The export option `backup` exports all necessary data for GnuPG to restore the key.

4. place this backup somewhere safe. Ideally, store it offline.

### 1.2 Restore

1. Import the private key.

```text
$ gpg --import-options restore --import private.gpg
```

```text
gpg: key BEBBEF4199FAB17B: public key "test key <test.key@example.com>" imported
gpg: key BEBBEF4199FAB17B: secret key imported
gpg: Total number processed: 1
gpg:               imported: 1
gpg:       secret keys read: 1
gpg:   secret keys imported: 1
```

this command will restore the key from the file `private.gpg`. The import option `restore` imports all necessary data for GnuPG to fully restore the key.

2. Edit the imported key

```text
$ gpg --edit-key test.key@example.com
```

```text
gpg (GnuPG) 2.2.41; Copyright (C) 2022 g10 Code GmbH
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Secret key is available.

sec  rsa4096/BEBBEF4199FAB17B
     created: 2023-05-30  expires: never       usage: SC
     trust: unknown       validity: unknown
ssb  rsa4096/573DFC84D89031BF
     created: 2023-05-30  expires: never       usage: E
[ unknown] (1). test key <test.key@example.com>
```

3. Type `trust` to modify the trust value of the key.

```text
gpg> trust
```

```text
sec  rsa4096/BEBBEF4199FAB17B
     created: 2023-05-30  expires: never       usage: SC
     trust: unknown       validity: unknown
ssb  rsa4096/573DFC84D89031BF
     created: 2023-05-30  expires: never       usage: E
[ unknown] (1). test key <test.key@example.com>
```

4. Type `5` to trust your keys completely.

```text
Please decide how far you trust this user to correctly verify other users' keys
(by looking at passports, checking fingerprints from different sources, etc.)

  1 = I don't know or won't say
  2 = I do NOT trust
  3 = I trust marginally
  4 = I trust fully
  5 = I trust ultimately
  m = back to the main menu

Your decision? 5
```

5. Type `y` to confim

```text
Do you really want to set this key to ultimate trust? (y/N) y
```

```text
sec  rsa4096/BEBBEF4199FAB17B
     created: 2023-05-30  expires: never       usage: SC
     trust: ultimate      validity: unknown
ssb  rsa4096/573DFC84D89031BF
     created: 2023-05-30  expires: never       usage: E
[ unknown] (1). test key <test.key@example.com>
Please note that the shown key validity is not necessarily correct
unless you restart the program.
```

6. save

```text
gpg> save
```

## 2. Paper Backups

### 2.1 Backup

1. Determine which key to backup.

```text
$ gpg --list-secret-keys --keyid-format LONG
```

```text
/home/rayan/.local/share/gnupg/pubring.kbx
------------------------------------------
sec   rsa4096/BEBBEF4199FAB17B 2023-05-30 [SC]
      6BAD6CE934F697FD957D66ECBEBBEF4199FAB17B
uid                 [ultimate] test key <test.key@example.com>
ssb   rsa4096/573DFC84D89031BF 2023-05-30 [E]
```

2. Export the private GPG key.

Install `paperkey`

**Warning**: You need to have the public key available when restoring the paperkey backup, Since it is safe to have your public key available publicly, consider uploading it to a keyserver.

```text
$ gpg --export-secret-key test.key@example.com | paperkey --output private.asc
```

this command will output the secret key to the file `private.asc`

### 2.2 Restore

1. Import the private key.

To restore the secret key you need to have a file with the paperkey data and the public key. Then run the following command to import the private key.

```text
$ paperkey --pubring public-key.gpg --secrets private.asc | gpg --import
```

If you receive the error `unable to parse OpenPGP packets (is this armored data?)` while restoring your key, you need to dearmor your public key first:

```text
$ gpg --dearmor public-key.asc
```

2. Edit the imported key

```text
$ gpg --edit-key test.key@example.com
```

```text
gpg (GnuPG) 2.2.41; Copyright (C) 2022 g10 Code GmbH
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Secret key is available.

sec  rsa4096/BEBBEF4199FAB17B
     created: 2023-05-30  expires: never       usage: SC
     trust: unknown       validity: unknown
ssb  rsa4096/573DFC84D89031BF
     created: 2023-05-30  expires: never       usage: E
[ unknown] (1). test key <test.key@example.com>
```

3. Type `trust` to modify the trust value of the key.

```text
gpg> trust
```

```text
sec  rsa4096/BEBBEF4199FAB17B
     created: 2023-05-30  expires: never       usage: SC
     trust: unknown       validity: unknown
ssb  rsa4096/573DFC84D89031BF
     created: 2023-05-30  expires: never       usage: E
[ unknown] (1). test key <test.key@example.com>
```

4. Type `5` to trust your keys completely.

```text
Please decide how far you trust this user to correctly verify other users' keys
(by looking at passports, checking fingerprints from different sources, etc.)

  1 = I don't know or won't say
  2 = I do NOT trust
  3 = I trust marginally
  4 = I trust fully
  5 = I trust ultimately
  m = back to the main menu

Your decision? 5
```

5. Type `y` to confim

```text
Do you really want to set this key to ultimate trust? (y/N) y
```

```text
sec  rsa4096/BEBBEF4199FAB17B
     created: 2023-05-30  expires: never       usage: SC
     trust: ultimate      validity: unknown
ssb  rsa4096/573DFC84D89031BF
     created: 2023-05-30  expires: never       usage: E
[ unknown] (1). test key <test.key@example.com>
Please note that the shown key validity is not necessarily correct
unless you restart the program.
```

6. save

```text
gpg> save
```

## 3. Sources

- [JWillikers: backup and restore a gpg key](https://www.jwillikers.com/backup-and-restore-a-gpg-key)

- [ArchLinux Wiki: Paperkey](https://wiki.archlinux.org/title/Paperkey)

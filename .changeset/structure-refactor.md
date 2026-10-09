---
'@tac-ui/web': patch
'@tac-ui/native': patch
'@tac-ui/icon': patch
'@tac-ui/icon-native': patch
'@tac-ui/shared': patch
'@tac-ui/tokens': patch
---

Restructure sources into one kebab-case directory per component and add package repository metadata. The runtime `version` export now matches the package version (it reported 1.1.2 on web and native). No API changes.

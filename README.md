# Red Purge

Redis data manipulation tool.

## Installation

`npm install -g red-purge`

## Commands

### Displaying data

`red-purge show key KEY_ID` - to show the content of the key (if exists)

`red-purge show keys KEY1,KEY2,KEY3` - to show the content of several keys, supplied as a comma-separated list

`red-purge show keys KEY*` - to show the content of several keys, where `KEY*` could be any regular expression

### Removing data

`red-purge remove key KEY_ID` - to remove the key

`red-purge remove keys KEY1,KEY2,KEY3` - to remove several keys, supplied as a comma-separated list

`red-purge show keys KEY*` - to remove several keys, found by regex `KEY*` or any other regex.

### Configuration

By default Red Purge uses local redis and default database, but you could supply a custom database URL in several ways:

* run `export RED_PURGE=redis://some-domain.com` or load RED_PURGE variable in any other way to your environment.
* user flat `--url=redis://some-domain.com` as the last parameter, i.e. `red-purge show key KEY_ID --url=redis://some-domain.com`


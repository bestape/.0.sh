# dotfiles for bash shell
## about
Clone and run this on a new Ubuntu instance.
Tested on 12.04 and 14.04.

## setup
From ~:
* `sudo apt-get install -y git`
* `git clone http://0.sh.bestape.net .0.sh`
* `.0.sh/setup.sh`

## customize
To add apps to the setup, edit the `setup.json` file. 
To change backup settings, edit the `.backuprc` file.
To add to bash shell settings, edit the `.bashrc_unique` file.
To change the Node.js version, edit the `.nvmrc` file.

## license
[.0.sh](http://0.sh.bestape.net) is released under the [ISC](http://www.isc.org/downloads/software-support-policy/isc-license) license.

Copyright &copy; 2013-2014 by [bestape](mailto:.0.sh@bestape.net) 

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

## notes
Based on https://github.com/startup-class/dotfiles Startup Engineering MOOC by Balaji S. Srinivasan.

`posit.js` can be executed to install multiple applications at once. It will install whatever is listed in `posit.json`.

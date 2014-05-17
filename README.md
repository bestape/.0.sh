# bestape's devkit dotfiles
## about
Clone and run this on a new Ubuntu instance.
Tested on 12.04 and 14.04.
## setup
```
cd ~
sudo apt-get install -y git-core
git clone https://github.com/bestape/.dotfiles
./.dotfiles/setup.sh   
```
## customize
To add apps to the setup, edit the `.setuprc.json` file. 
To change backup settings, edit the `.backuprc` file.
To add to bash shell settings, edit the `.bashrc_custom` file.
## notes
Based on https://github.com/startup-class/dotfiles Startup Engineering MOOC by Balaji S. Srinivasan.
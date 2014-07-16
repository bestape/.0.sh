#! /bin/bash
# It is assumed git is already loaded.
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
nodeVer=$(cat $DIR/.nvmrc)
ln -sb $DIR/.nvmrc ~
ln -sb $DIR/.screenrc ~
cp $DIR/.bash_profile.proto $DIR/.bash_profile
ln -sb $DIR/.bash_profile ~
ln -sb $DIR/.bashrc ~
cp $DIR/.bashrc_unique.proto $DIR/.bashrc_unique
ln -sb $DIR/.bashrc_unique ~
cp $DIR/.backuprc.proto $DIR/.backuprc
ln -sb $DIR/.backuprc ~
ln -sf $DIR/.emacs.d ~
echo "--------------- git options setup ----------------
------------------ part 1 of 2 -------------------
please input your git user.name and press [ENTER]:
If you want to skip, leave blank and press [ENTER]:"
read userName
if [ $userName ]; then
    git config --global user.name $userName
fi
echo "------------------ part 2 of 2 -------------------
please input your git user.email and press [ENTER]:
If you want to skip, leave blank press [ENTER]:"
read userEmail
if [ $userEmail ]; then	
    git config --global user.email $userEmail
fi
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | sh
source ~/.nvm/nvm.sh
nvm install $nodeVer
node $DIR/posit.js
sudo apt-get -y update && sudo apt-get -y upgrade
echo "
--------------- fin setup notice -----------------
Setup is now complete.
Please load a new login bash shell to start using all the features.
You can load a new login bash shell by logging in and out of this operating system.
Alternatively, you can reboot the entire operating system.

--------------- fin setup options ----------------
Would you like to reboot the system now?
If so, type yes and press [ENTER].
Otherwise, leave blank and press [ENTER] to exit this setup."
read rebootQ
if [ $rebootQ ] && [ $rebootQ == "yes" ]; then
	sudo reboot
else
	source ~/.bashrc
	exit 0
fi

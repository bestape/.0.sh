#! /bin/bash
# It is assumed git is already loaded.
echo '
--------------- git options setup ----------------
------------------ part 1 of 2 -------------------
please input your git user.name and press [ENTER]:
If you want to skip, leave blank and press [ENTER]:'
read userName
if [ $userName ]; then
	git config --global user.name $userName
fi
echo '------------------ part 2 of 2 -------------------'
echo 'please input your git user.email and press [ENTER]:'
echo 'If you want to skip, leave blank press [ENTER]:'
read userEmail
if [ $userEmail ]; then	
	git config --global user.email $userEmail
fi
git clone https://github.com/creationix/nvm.git ~/.nvm
source ~/.nvm/nvm.sh
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
origPWD=$PWD
cd $DIR
ln -sb .nvmrc ~
ln -sb .screenrc ~
ln -sb .bash_profile ~
ln -sb .bashrc ~
cp .bashrc_custom.proto .bashrc_custom
ln -sb .bashrc_custom ~
cp .backuprc.proto .backuprc
ln -sb .backuprc ~
ln -sf .emacs.d ~
source .bashrc
./.setuprc.js
cd $origPWD
exit 0

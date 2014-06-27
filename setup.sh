#! /bin/bash
# It is assumed git is already loaded.
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
nodeVer=$(cat $DIR/.nvmrc)
ln -sb $DIR/.nvmrc ~
ln -sb $DIR/.screenrc ~
ln -sb $DIR/.bash_profile ~
ln -sb $DIR/.bashrc ~
cp $DIR/.bashrc_unique.proto $DIR/.bashrc_unique
ln -sb $DIR/.bashrc_unique ~
cp $DIR/.backuprc.proto $DIR/.backuprc
ln -sb $DIR/.backuprc ~
ln -sf $DIR/.emacs.d ~
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
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | sh
source ~/.nvm/nvm.sh
nvm install $nodeVer
node $DIR/setup.js
source .bashrc
echo '
Setup is now complete.
Please load a new login bash shell to start using all the features.
You can load a new login bash shell by logging in and out of this operating system.'
exit 0

#! /usr/bin/env node
// static
var xO = require('./setup.json')
, xA = Object.keys(xO)
, xE = require('child_process').spawn
// micro
function spawnErr(xO) {
    console.warn(xO)
    return
} 
function addRepo(xA, xO, yA, zA) {
    zA = mkCmd('apt-add-repository', xO, xO.ppa)
    function installRepo() {
	xE('sudo', ['apt-get', 'update'], {stdio: 'inherit'}).on('error', spawnErr).on('close', finishRepoInstall) 
	return
    }
    function finishRepoInstall() {
	delete xO.ppa
	installApp(xA, xO, yA)
	return
    }
    xE(zA[0], zA[1], {stdio: 'inherit'}).on('error', spawnErr).on('close', installRepo)
    return
}
// macro
function mkCmd(xS, xO, yS, yA) {
    yA = []
    function pushXA(xA, i) {
	for (i = 0; i < xO.append.length; i++) xA.push(xO.append[i])
	return xA
    }
    switch (xS) {
    case "apt-get":
	if (xO.root) {
	    yA.push('sudo')
	    yA.push([xS, 'install'])
	} else {
	    yA.push(xS)
	    yA.push(['install'])
	}
	if (xO.promptUser === false) yA[1].push('-y')
	yA[1].push(yS)
	if (xO.append) {
	    if (Array.isArray(xO.append)) yA[1] = pushXA(yA[1])
	    else yA[1].push(xO.append)
	}
	return yA
    case "apt-add-repository":
	yA.push('sudo', [xS])
	if (xO.promptUser === false) yA[1].push('-y')
	yA[1].push('ppa:' + yS)
	return yA
    case "npm":
	if (xO.root) {
	    yA.push('sudo')
	    yA.push([xS, 'install'])
	} else {
	    yA.push(xS)
	    yA.push(['install'])
	}
	if (xO.root) yA[1].push('-g')
	yA[1].push(yS)
	return yA
    case "dpkg-reconfigure":
	if (xO.root) {
	    yA.push('sudo')
	    yA.push([xS])
	} else yA.push(xS)
	yA[1].push(yS)
	return yA
    default:
	return false
    }
}
function installApp(xA, xO, yA) {
    function finishAppInstall() {
	if (xO.script) require('./' + xO)
	nextApp(yA[0], yA[1])
	return
    }
    if (xO.ppa) addRepo(xA, xO, yA)
    else xE(xA[0], xA[1], {stdio: 'inherit'}).on('error', spawnErr).on('close', finishAppInstall)
    return
}
// dynamic
function nextApp(xN, yN, xS, yA, yS, yO, zA) {
    if (xA.length - 1 > xN) {
	if (xA[xN].length - 1 > yN) {
	    xS = xA[xN]
	    yA = Object.keys(xO[xS])
	    yS = yA[yN]
	    yO = xO[xS][yS]
	    zA = mkCmd(xS, yO, yS)
	    yN++
	    if (zA) installApp(zA, yO, [xN, yN])
	    else console.warn('I do not know how to run ' + xS + ' files')
	} else {
	    xN++
	    nextApp(xN, 0)
	}
    } else console.log('Finished loading applications.')
    return
}
nextApp(0, 0)

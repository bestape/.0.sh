#! /usr/bin/env node
// issues
var i = 0
// assumptions
, jsonrc = require('./.setuprc.json')
, types = Object.keys(jsonrc)
, spawn = require('child_process').spawn
// subject events
function mkCmd(type, obj, app) {
	var array = []		
	function pushArray(array) {
		var i
		for (i = 0; i < obj.append.length; i++) {
			array.push(obj.append[i])
		}
		return array
	}
	switch (type) {
	case "apt-get": 
		if (obj.root) {
			array.push('sudo')
			array.push([ type, 'install' ])
		}
		else {
			array.push(type)
			array.push([ 'install' ]) 
		}
		if (obj.promptUser === false) array[1].push('-y')
		array[1].push(app)
		if (obj.append) {
			if (Array.isArray(obj.append)) array[1] = pushArray(array[1])
			else array[1].push(obj.append)
		}
		return array
	case "apt-add-repository":
		array.push('sudo', [ type ])
		if (obj.promptUser === false) array[1].push('-y')
		array[i].push('ppa:' + app)
		return array
	case "npm": 
		if (obj.root) {
			array.push('sudo')
			array.push([ type, 'install' ])
		}
		else {
			array.push(type)
			array.push([ 'install' ]) 
		}
		if (obj.root) array[1].push('-g')
		array[1].push(app)
		return array
	case "dpkg-reconfigure": 
		if (obj.root) {
			array.push('sudo')
			array.push([ type ])
		}
		else {
			array.push(type)
		}
		array[1].push(app)
		return array
	default: 
		console.warn('I do not know how to run ' + type[h] + ' files')
		return
	}
}
// outline events
function addRepo(appCmd, obj, next) {
	var cmd = mkCmd('apt-add-repository', obj, obj.ppa)
	, spawned = spawn(cmd[0], cmd[1], { stdio: 'inherit' })
	spawned.on('close', function () {
		var spawned = spawn('sudo', [ 'apt-get', 'update' ], { stdio: 'inherit' })
		spawned.on('close', function () {
			delete obj.ppa
			install(appCmd, obj, next)
			return
		})
		return
	})
}
function runScript(code, next) {
	require('./' + code)
	nextApp(next[0], next[1])
}
// outline
function install(cmd, obj, next) {
	if (obj.ppa) addRepo(cmd, obj, next)
	else { 
		var spawned = spawn(cmd[0], cmd[1], { stdio: 'inherit' })
		spawned.on('close', function () {
			if (obj.script) runScript(obj.script, next)
			else nextApp(next[0], next[1])
			return
		})
	}
	return
}
// subject
function thisApp(type, obj, key) {
	var apps = Object.keys(obj)
	if (key < apps.length) {
		var app = apps[key]
		, cmd = mkCmd(type, obj[app], app)
		key++
		install(cmd, obj[app], [ type, key ])
	}
	else nextApp()
	return
}
// get subject
function nextApp(type, key) {
	var h = i
	if ((! type) && (h < types.length)) {
		i++ 
		type = types[h]
		key = 0
	}
	if (type) thisApp(type, jsonrc[type], key) 
}
// start
nextApp()

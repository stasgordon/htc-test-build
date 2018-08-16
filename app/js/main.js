var tab;
var tabContent;

window.onload = function() {
    tabContent = document.getElementsByClassName('tabContent');
    tab = document.getElementsByClassName('tab');
    hideTabsContent(1);
}

function hideTabsContent(a) {
    for (var i = a; i < tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
        tab[i].classList.remove('whiteborder');
    }
}

document.getElementById('tabs').onclick = function(event) {
    var target = event.target;
    if (target.className == 'tab') {
        for (var i = 0; i < tab.length; i++) {
            if (target == tab[i]) {
                showTabsContent(i);
                break;
            }
        }
    }
}

function showTabsContent(b) {
    if (tabContent[b].classList.contains('hide')) {
        hideTabsContent(0);
        tab[b].classList.add('whiteborder');
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
    }
}

var a = 'asd';

var profile = {
    setName: function(name) {
        storage.set('name', name);
    },
    setAddress: function(address) {
        storage.set('address', address);
    },
    setHobby: function(hobby) {
        var hobbys = storage.get('hobbys')
        hobbys.push(hobby);
        hobbys = hobbys.reverse();
        storage.set('hobbys', hobbys);
    }
}

var storage = {
    set: function(name, e) {
        localStorage.setItem(name, JSON.stringify(e));
    },
    get: function(name) {
        return JSON.parse(localStorage.getItem(name));
    }
}

function build() {
    var profileContent = document.querySelector('.profile-content');
    profileContent.children[0].value = storage.get('name');
    profileContent.children[1].value = storage.get('address');
    console.log([profileContent]);
}

function initProfileListener() {
    var profileContent = document.querySelector('.profile-content');
    profileContent.children[0].onblur = function() {
        profile.setName(profileContent.children[0].value);
    }
    profileContent.children[1].onblur = function() {
        profile.setAddress(profileContent.children[1].value);
    }
    build();
}


document.addEventListener('DOMContentLoaded', initProfileListener);
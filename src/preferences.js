class Preferences {
    constructor() {
        this.effects = true;
        this.sfxVolume = 1;
        this.musicVolume = 1;
    }

    persist() {
        Object.keys(this).forEach(key => localStorage.setItem(key, JSON.stringify(this[key])));
    }

    load() {
        Object.keys(this).forEach(key => this[key] = localStorage.getItem(key) !== null ? JSON.parse(localStorage.getItem(key)) : this[key]);
    }
}

const SINGELTON = new Preferences();

export default SINGELTON;
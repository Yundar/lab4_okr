export default class Main {
    constructor(home){
        this.home = home;
    }

    loadDefaultPage(){
        this.home.loadHome();
    }

}
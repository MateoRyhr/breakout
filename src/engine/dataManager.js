export default class DataManager{
    constructor(){

        //gameConfig
        this.level = 0
        this.blockColors = ['#FF2800',
                            '#290CFF',
                            '#66FFFF',
                            '#ffd319',
                            '#86D41A',
                            '#16c79a'
        ]
        this.ballColor = '#FF2800'
        this.playerColor = '#202229'
        this.speed = 10
        this.sound = true
        this.score = 0
    }

    plusScore(plus){
        this.score += plus
    }
}
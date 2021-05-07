export default class DataManager{
    constructor(){

        //gameConfig
        this.level = 0
        //establecer 4 dificultades:
        // Very easy
        // Easy
        // Normal
        // Hard
        this.difficulty
        this.ballMaxVelX
        this.ballMaxVelY
        this.soundEffects = true
        this.music = true
        this.lifes = 0
        this.score = 0//max score 5500

        this.ballColor = '#FF2800'
        this.playerColor = '#252a34'
        this.blockColors = [
            [
                '#e23e57','#88304e','#522546','#311d3f' //lindo
            ],
            [
                '#48466d','#3d84a8','#46cdcf','#abedd8' //lindo
            ],
            [
                '#6fe7dd','#3490de','#6639a6','#521262' // lindaa
            ],
            [
                '#0c056d','#590d82','#b61aae','#f25d9c' //lindo
            ],
            [
                '#8c0000','#bd2000','#fa1e0e','#ffbe0f' // linda
            ],
            [
                '#26001b','#810034','#ff005c','#fff600' // zafa
            ],
            [
                '#2b2e4a','#e84545','#903749','#53354a' // lindo
            ],
            [
                '#822659','#b34180','#e36bae','#f8a1d1' // zafa
            ],
            [
                '#C4E538','#A3CB38','#009432','#006266' //lindo
            ],
            [
                '#bedcfa','#98acf8','#b088f9','#da9ff9' // zafa
            ],
            [
                '#511845','#900c3f','#c70039','#ff5733' // linda
            ],
            [
                '#3a0088','#930077','#e61c5d','#ffbd39' // linda
            ]
        ]
    }
}
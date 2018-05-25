import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
 
@Injectable()
export class SmartAudioProvider {
 
    audioType: string = 'native';
    sounds: any = [];
 
    constructor(public nativeAudio: NativeAudio, platform: Platform) {

        this.audioType = 'native';
 
    }
 
    preload(key, asset) {
 
        this.nativeAudio.preloadSimple(key, asset);

        let audio = {
            key: key,
            asset: asset,
            type: 'native'
        };

        this.sounds.push(audio);

    }
 
    play(key){
 
        let audio = this.sounds.find((sound) => {
            return sound.key == key;
        });
         console.log(audio);
        this.nativeAudio.play(audio.asset).then((res) => {
                console.log(res);
            }, (err) => {
                console.log(err);
            });
        }
 
}
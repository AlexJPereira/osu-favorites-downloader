import axios from 'axios'
import axiosCookieJarSupport from 'axios-cookiejar-support'
import tough from 'tough-cookie'
import delay from '../utils/delay'

axiosCookieJarSupport(axios);


export default class OsuApi{
    private cookieJar = new tough.CookieJar();
    private globalDelay = 1000

    async tests(){
        await this.getCookies()
        console.log(this.cookieJar)
    }
    
    async getCookies(){
        await axios.get("https://osu.ppy.sh/home",{
            jar: this.cookieJar,
            withCredentials: false
        })
        await delay(this.globalDelay)
    }
}
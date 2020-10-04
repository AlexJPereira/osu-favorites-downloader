import { AxiosResponse } from 'axios'

export interface ILoginPage extends AxiosResponse{
    data: {
        user: {
            username: string
            avatar_url: string
            country_code: string
            id: number
        }
    }
}

export default class OsuUser{
    private loginPage: ILoginPage

    constructor(loginPage: ILoginPage){
        this.loginPage = loginPage
    }

    get username(){
        return this.loginPage.data.user.username
    }

    get userPic(){
        return this.loginPage.data.user.avatar_url
    }
}
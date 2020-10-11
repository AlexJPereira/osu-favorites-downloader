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

export interface IUser{
    username: string
    userPic: string
    userId: number
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

    get userId(){
        return this.loginPage.data.user.id
    }

    get object(): IUser{
        return {
            username: this.username,
            userPic: this.userPic,
            userId: this.userId
        }
    }
}
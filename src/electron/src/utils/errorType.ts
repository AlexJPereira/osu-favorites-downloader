import { IpcMainEvent } from 'electron'

export enum ErrorType{
    WrongPassword = "403",
    ReCaptcha = "422",
    Ban = "429",
    NoInternet = "-1"
}

export default {
    getErrorStatusCode(err: any){
        return (err && err.request && err.request.res) ? err.request.res.statusCode.toString() : (err && err.request ? "-1" : "-2");
    },
    sendErrorMessage(event: IpcMainEvent, message: string, highlightComponentId?: string){
        event.reply("errorDialog", message, highlightComponentId)
    },
    sendInternetErrorMessage(err: any, event: IpcMainEvent, alreadyLogged?: boolean){
        switch(this.getErrorStatusCode(err)){
            case ErrorType.WrongPassword:
                if(alreadyLogged)
                    this.sendErrorMessage(event, "Osu server is blocking your connection due to excessive number of downloads, please try again later.");
                else 
                    this.sendErrorMessage(event, "Wrong Password.", "password-input");
                return true
            case ErrorType.ReCaptcha:
                this.sendErrorMessage(event, "A ReCaptch is blocking your login, login on Osu using the Browser.");
                return true
            case ErrorType.Ban:
                this.sendErrorMessage(event, "Your IP was banned for doing too many requests, wait some minutes and try again later.");
                return true
            case ErrorType.NoInternet:
                this.sendErrorMessage(event, "Failed to connect with the server, check your internet connection or try again later.", "password-input");
                return true
            default:
                return false
        }
    },
    sendFileError(event: IpcMainEvent){
        this.sendErrorMessage(event, "Error on directory selected, choose another directory.");
    },
    sendUnknownError(err: any, event: IpcMainEvent){
        this.sendErrorMessage(event, "Unknown error, try again.");
        console.log(err)
    }
}

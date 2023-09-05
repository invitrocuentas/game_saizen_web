

class Api {


    constructor(){
        this.url = 
    }

    getURL(URL){
        return this.url+URL
    }

    async getInfo(URL){
        const url = this.getURL(URL)
        const {data} = await axios.get(url)
        return data
    }


}

export {
    Api
}
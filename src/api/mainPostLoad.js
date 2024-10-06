import axios from 'axios';

class MainPostLoad {
    // 페이지 정보 불러오기
    async getPostsPage({search, category, mymode}){
        try {
            const res = await axios.post(`/post/getposts/page`,{
                search,
                category,
                mymode
            }, {
                
              });
            return res.data.result;
        }
        catch(e) {
            console.log(e.message);
            // alert
            return;
        }
    }

    // 수업 정보 불러오기
    async getPostsRead({nowpage, search, category, mymode}){
        try{
            const res = await axios.post(`/post/getposts/page/read`,{
                nowpage,
                search,
                category,
                mymode
            },{
                 // 쿠키를 포함시키기 위해 필요
            });
            // 기존 db 방식일 때 
            /*
            const posts = res.data.result.map(v => {
                const main_image_link = `data:${v.main_image.contentType};base64,${v.main_image.data}`;
                const sub_image_links = v.sub_images ? v.sub_images.map(i => `data:${i.contentType};base64,${i.data}`) : [];
                return {
                    ...v,
                    main_image_link,
                    sub_image_links
                } 
            });
            */
            return /*posts*/ res.data.result;
        } catch (e) {
            alert(e.response?.data?.message);
            console.log(e);
            return;
        }
    }
}

const mainPostLoad = new MainPostLoad();
export default mainPostLoad;
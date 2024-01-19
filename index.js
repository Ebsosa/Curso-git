const url = "https://jsonplaceholder.typicode.com"

const getuser = async (id) => {
    const res = await fetch (`${url}/users?id=${id}`);
    const user = (await res.json())[0];

    return user;
}

const getPosts = async (user) => {
    const res = await fetch(`${url}/posts?userId=${user.id}&_limit=3`)
    const posts = await res.json();

    return posts;
}

const getCommentsForEachPost = async (posts) => {
const res = await Promise.all(posts.map(post =>
fetch(`${url}/comments?postId=${post.id}&_Limit=2`)
))
const postComments = await Promise.all(res.map(r => r.json()));

postComments.forEach((comments, i) => posts[i].comments = comments);
}

   
const getslogContent = async () => {  
        try {
        const user = await getuser(1);
        const post = await getPosts(user);
        await getCommentsForEachPost(post);

        console.log(user);
        console.log(post)
        } catch(err){
            console.log(err);
        }
    }
          
    getslogContent();
import db from '../db/db';

import IPost from '../domain/Post';

class Post {
    public static table = 'post';

    public static async getUserPosts(userId: number): Promise<IPost[]> {
        const posts =await db(Post.table)
            .select()
            .where("user_account_id", userId);
        return posts;
    }

     
}

export default Post;
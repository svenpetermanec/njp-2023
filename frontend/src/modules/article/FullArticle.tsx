import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../util/axios';
import { Article } from './article.interface';
import Header from './components/Header';
import { toast } from 'react-toastify';

const FullArticle = () => {
    const [article, setArticle] = useState<Article>();
    const [image, setImage] = useState<string>();
    const [comments, setComments] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        (async () => {
            const response = await axios.get(`/article/${id}`);
            setArticle(response.data);

            const imageResposne = await fetch(
                `http://localhost:3000/image/${response.data.imagePath}`
            );
            const imageBlob = await imageResposne.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);

            setImage(() => imageObjectURL);

            const commentsResponse = await axios.get(
                `/comment/${response.data.id}`
            );
            setComments(commentsResponse.data);
        })();
    }, [comments]);

    const onComment = async (e: any) => {
        e.preventDefault();
        const data = new FormData(e.target);
        console.log(data.get('comment'));
        await axios.post(`/comment/${article?.id}`, {
            content: data.get('comment'),
        });
        toast.success('Comment sent');
        e.target.reset();
    };

    return (
        <>
            <Header />
            <div className="bg-gray-300 flex flex-col justify-center p-2">
                <h1 className="text-5xl text-teal-500 my-5">
                    {article?.title}
                </h1>
                <p>by {article?.username}</p>
                <p>{article?.category}</p>
                <p className="py-5">{article?.content}</p>
                <img src={image} />
                {!comments.length && <p>No comments</p>}
                {comments.map((comment: any) => (
                    <div
                        key={comment.id}
                        className="bg-gray-200 my-2 p-1 rounded-md"
                    >
                        <p>
                            {comment.username} at{' '}
                            {new Date(comment.createdAt).toString()}
                        </p>
                        <h2 className="text-lg">{comment.content}</h2>
                    </div>
                ))}
                <form onSubmit={onComment}>
                    <input
                        type="text"
                        name="comment"
                        placeholder="Your comment"
                        className="p-1 rounded-md w-full"
                    />
                </form>
            </div>
        </>
    );
};

export default FullArticle;

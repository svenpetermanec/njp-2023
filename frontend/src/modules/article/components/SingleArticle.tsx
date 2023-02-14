import { Article } from '../article.interface';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from '../../../util/axios';
import { toast } from 'react-toastify';

interface Props {
    article: Article;
}

const SingleArticle = ({ article }: Props) => {
    const [image, setImage] = useState<string>();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const response = await fetch(
                `http://localhost:3000/image/${article.imagePath}`
            );
            const imageBlob = await response.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);

            setImage(() => imageObjectURL);
        })();
    }, []);

    const token: any = jwt_decode(localStorage.getItem('jwt')!);

    const onDelete = async () => {
        await axios.delete(`/article/${article.id}`);
        toast.success('Article deleted');
    };

    return (
        <div key={article.id} className="bg-white rounded-md p-2 m-2">
            <div className="flex justify-between">
                <h2>{article.title}</h2>
                {(token.user.id === article.userId ||
                    token.user.isAdmin === 1) && (
                    <>
                        <select className="bg-white">
                            <option></option>
                            <option
                                onClick={() =>
                                    navigate(`/article/new/${article.id}`)
                                }
                            >
                                Edit
                            </option>
                            <option onClick={onDelete}>Delete</option>
                        </select>
                    </>
                )}
            </div>

            <p
                className="text-gray-400 text-sm hover:cursor-pointer"
                onClick={() => navigate(`/category/${article.category}`)}
            >
                {article.category}
            </p>
            <div onClick={() => navigate(`/article/${article.id}`)}>
                <hr />
                <img src={image} className="max-h-72 rounded-md"></img>
            </div>
        </div>
    );
};

export default SingleArticle;

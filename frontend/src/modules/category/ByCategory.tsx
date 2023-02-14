import { useParams } from 'react-router-dom';
import Header from '../article/components/Header';
import { useEffect, useState } from 'react';
import axios from '../../util/axios';
import { Article } from '../article/article.interface';
import SingleArticle from '../article/components/SingleArticle';

const ByCategory = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const { title } = useParams();

    useEffect(() => {
        (async () => {
            const response = await axios.get(`/category/${title}`);
            setArticles(response.data);
        })();
    }, []);

    return (
        <>
            <Header />
            <div className="bg-gray-300 flex flex-col justify-center items-center p-2">
                {articles.map((article: Article) => (
                    <SingleArticle article={article} key={article.id} />
                ))}
            </div>
        </>
    );
};
export default ByCategory;

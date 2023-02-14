import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from '../../util/axios';
import { Article } from './article.interface';
import Header from './components/Header';
import SingleArticle from './components/SingleArticle';

const Home = () => {
    const [articles, setArticles] = useState<Article[]>([]);

    if (!localStorage.getItem('jwt')) return <Navigate to="/login" />;

    useEffect(() => {
        (async () => {
            const response = await axios.get('/article');
            setArticles(response.data);
        })();
    }, [articles]);

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

export default Home;

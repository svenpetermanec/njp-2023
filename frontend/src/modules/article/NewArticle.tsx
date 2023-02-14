import Header from './components/Header';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from '../../util/axios';
import { toast } from 'react-toastify';
import { Article } from './article.interface';
import { useParams } from 'react-router-dom';

interface Category {
    id: number;
    title: string;
}

const NewArticle = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [article, setArticle] = useState<Article>();

    const { id } = useParams();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const onSubmit = async (values: any) => {
        const form = new FormData();
        form.append('title', values.title);
        form.append('content', values.content);

        if (id) {
            await axios.put(`/article/${article!.id}`, {
                title: values.title,
                content: values.content,
            });
            toast.success('Article updated');
        } else {
            form.append(
                'categoryId',
                categories
                    .find((cat: Category) => cat.title === values.category)!
                    .id.toString()
            );
            form.append('image', values.image[0]);

            await axios.post('/article', form);
            toast.success('Article published');
        }
    };

    useEffect(() => {
        (async () => {
            const response = await axios.get('/category');
            setCategories(response.data);

            if (id) {
                const articleResponse = await axios.get(`/article/${id}`);
                setArticle(articleResponse.data);
            }
        })();
    }, []);

    return (
        <>
            <Header />
            <div
                className="bg-gray-300 flex flex-col justify-center p-2"
                style={{ height: '925px' }}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    <input
                        type="text"
                        placeholder="title"
                        defaultValue={article?.title}
                        className="rounded-md p-2 w-full text-gray-400"
                        {...register('title', {
                            required: 'Title required',
                        })}
                    />
                    <>{errors.title && errors.title.message}</>
                    <br />
                    <textarea
                        placeholder="content"
                        defaultValue={article?.content}
                        className="rounded-md p-2 w-full text-gray-400"
                        {...register('content', {
                            required: 'Content required',
                        })}
                    />
                    <>{errors.content && errors.content.message}</>
                    <br />
                    <select
                        placeholder="category"
                        {...register('category')}
                        className="w-full rounded-md bg-white p-2"
                    >
                        {categories.map((category: Category) => (
                            <option key={category.id} value={category.title}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                    <br />
                    Image:{' '}
                    <input
                        type="file"
                        accept="image/*"
                        className="rounded-md p-2 w-full text-gray-400"
                        {...register('image')}
                    />
                    <p className="text-red-600"></p>
                    <button
                        type="submit"
                        className="bg-white w-full text-gray-400 p-2 rounded-md hover:bg-gray-200 hover:text-teal-500"
                    >
                        Publish article
                    </button>
                </form>
            </div>
        </>
    );
};

export default NewArticle;

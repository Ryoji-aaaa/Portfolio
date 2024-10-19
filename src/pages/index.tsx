import { useEffect } from 'react';
import { useRouter } from 'next/router';

const IndexPage = () => {
    const router = useRouter();

    useEffect(() => {
        const checkLoginStatus = async () => {
            // Replace this with your actual login check logic
            const isLoggedIn = await fakeLoginCheck();

            if (isLoggedIn) {
                router.push('/mypage');
            } else {
                router.push('/login');
            }
        };

        checkLoginStatus();
    }, [router]);

    // Fake login check function for demonstration purposes
    const fakeLoginCheck = async () => {
        // Simulate an API call
        return new Promise((resolve) => setTimeout(() => resolve(true), 1000));
    };

    return null;
};

export default IndexPage;
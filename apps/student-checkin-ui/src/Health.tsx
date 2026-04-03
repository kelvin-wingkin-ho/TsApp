import { useEffect, useState } from 'react';

interface ApiResult {
    message: string;
}

const Health: React.FC = () => {

    const [result, setResult] = useState<ApiResult | null>(null);

    useEffect(() => {
        fetch('http://localhost:3000')
        .then(resp => resp.json())
        .then((data: ApiResult) => setResult(data));
    }, [])

    return (
        <div>{result ? result.message : 'Loading...'}</div>
    );
}

export default Health;

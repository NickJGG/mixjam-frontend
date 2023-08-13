import { useEffect, useState } from "react";

const useTitle = (title) => {
    const [pageTitle, setPageTitle] = useState(title);
    
    useEffect(() => {
        document.title = `${pageTitle} | MixJam`;
    }, [pageTitle]);

    return [pageTitle, setPageTitle];
};

export default useTitle;

export interface UserInfo {
    country: string;
    display_name: string;
    email: string;
    external_urls: {
        spotify: string;
    };
    followers: {
        href?: string;
        total: number;
    };
    href: string;
    id: string;
    images: Img[];
    product: string;
    type: string;
    uri: string;
}

interface Img {
    height?: number;
    url: string;
    width?: number;
}

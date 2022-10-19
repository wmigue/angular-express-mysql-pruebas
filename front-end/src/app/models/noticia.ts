
export class Noticia {
    _id: string;
    content_elements: ContentElement[];
    count: number;
  }
  
  export interface ContentElement {
    description: Description;
    headlines: Description;
    last_updated_date: string;
    promo_items: PromoItems;
    type: string;
    website_url: string;
  }
  
  export interface Description {
    basic: string;
  }
  
  export interface PromoItems {
    basic: Basic;
  }
  
  export interface Basic {
    caption?: string;
    height: number;
    resized_params: {
      [key: string]: string;
    }[];
    url: string;
    url_placeholder: string;
    width: number;
    alt_text?: string;
  }
  
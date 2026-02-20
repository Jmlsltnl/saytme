export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      site_settings: {
        Row: {
          id: string
          site_name: string
          site_description: string | null
          logo_url: string | null
          favicon_url: string | null
          footer_text: string | null
          social_links: Json | null
          updated_at: string
          hero_title: string | null
          hero_description: string | null
          google_analytics_id: string | null
          google_tag_manager_id: string | null
          google_search_console_code: string | null
          author_name: string | null
          author_image: string | null
          about_text: string | null
        }
        Insert: {
          id?: string
          site_name?: string
          site_description?: string | null
          logo_url?: string | null
          favicon_url?: string | null
          footer_text?: string | null
          social_links?: Json | null
          updated_at?: string
          hero_title?: string | null
          hero_description?: string | null
          google_analytics_id?: string | null
          google_tag_manager_id?: string | null
          google_search_console_code?: string | null
          author_name?: string | null
          author_image?: string | null
          about_text?: string | null
        }
        Update: {
          id?: string
          site_name?: string
          site_description?: string | null
          logo_url?: string | null
          favicon_url?: string | null
          footer_text?: string | null
          social_links?: Json | null
          updated_at?: string
          hero_title?: string | null
          hero_description?: string | null
          google_analytics_id?: string | null
          google_tag_manager_id?: string | null
          google_search_console_code?: string | null
          author_name?: string | null
          author_image?: string | null
          about_text?: string | null
        }
      }
      categories: {
        Row: {
          id: string
          name_az: string
          slug: string
          color_theme: string
          created_at: string
        }
        Insert: {
          id?: string
          name_az: string
          slug: string
          color_theme: string
          created_at?: string
        }
        Update: {
          id?: string
          name_az?: string
          slug?: string
          color_theme?: string
          created_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          title_az: string
          slug: string
          content_html: string
          thumbnail_url: string
          read_time_az: string
          category_id: string
          card_size: 'hero' | 'square' | 'wide' | 'standard'
          is_featured: boolean
          published_at: string
          seo_title: string | null
          seo_description: string | null
          og_image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title_az: string
          slug: string
          content_html: string
          thumbnail_url: string
          read_time_az: string
          category_id: string
          card_size?: 'hero' | 'square' | 'wide' | 'standard'
          is_featured?: boolean
          published_at?: string
          seo_title?: string | null
          seo_description?: string | null
          og_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title_az?: string
          slug?: string
          content_html?: string
          thumbnail_url?: string
          read_time_az?: string
          category_id?: string
          card_size?: 'hero' | 'square' | 'wide' | 'standard'
          is_featured?: boolean
          published_at?: string
          seo_title?: string | null
          seo_description?: string | null
          og_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
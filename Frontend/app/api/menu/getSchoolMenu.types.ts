export interface IFood {
    id: number,
    name: string,
    description: string,
    subtext: string
    image_url: string,
    hoverpic_url: string,
    price?: number,
    ingredients: string,
    food_category: string,
    food_highlight_message?: string,
    file_url: string,
    download_label: string,
    rounded_nutrition_info: Record<string, unknown>,
    serving_size_info: Record<string, unknown>,
    has_nutrition_info: boolean,
    icons: Record<string, unknown>,
    icons_approved: true,
    nested_foods: string[],
    aggregated_data: Record<string, unknown>,
    ordering_enabled: boolean,
    food_sizes: string[],
    ds_calories_override: string,
    synced_id: string,
    sync_placeholder?: string,
    has_options_or_sides: false,
    digest: string,
    pos_item_id: string,
    smart_recipe_id?: number,
    has_subfoods: boolean,
    meal_plan_price?: number,
    use_custom_sizes: boolean,
    tags?: string[]
}
export interface IDay {
    date: string,
    has_unpublished_menus: boolean,
    menu_info: IMenuInfo,
    menu_items: IItem[]
}

export interface IMenuResponse {
    start_date: string,
    menu_type_id: number,
    days: IDay[],
    id: number,
    last_updated: string,
    bold_all_entrees_enabled: boolean
}

export interface IItem {
    id: number,
    date: string,
    position: number,
    is_section_title: boolean,
    bold: boolean,
    featured: boolean,
    text: string,
    no_line_break: boolean,
    blank_line: boolean,
    food: IFood,
    is_holiday: boolean,
    food_list: string[],
    station_id: number,
    is_station_header: boolean,
    station_is_collapsible: boolean,
    station_logo?: string,
    image: string,
    image_description?: string,
    image_alt?: string,
    image_thumbnail?: string,
    category: string,
    price?: number,
    serving_size?: string | number,
    serving_size_amount: number,
    serving_size_unit: string,
    smart_recipe_id?: number,
    menu_id: number,
    food_variation_id: number
}
export interface IMenuInfo{
    [key: string]: {
        position: number,
        section_options: {
            display_name?: string;
            use_section_title: boolean,
            section_title_can_expand_collapse: boolean
        }
    }
}

export interface IRenderItem {
    food: string,
    category: string
}
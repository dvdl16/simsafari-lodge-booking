export interface CommonName {
    id: number;
    name: string;
    is_valid: boolean;
    lexicon: string;
}

export interface Taxon {
    id: number;
    name: string;
    rank: string;
    ancestry: string;
    common_name: CommonName;
}

export interface IconicTaxon {
    id: number;
    name: string;
    rank: string;
    rank_level: number;
    ancestry: string;
}

export interface User {
    login: string;
    user_icon_url: string | null;
}

export interface Photo {
    id: number;
    user_id: number;
    native_photo_id: string | null;
    created_at: Date | string;
    updated_at: Date | string;
    native_page_url: string | null;
    native_username: string | null;
    native_realname: string | null;
    license: number;
    subtype: string | null;
    native_original_image_url: string | null;
    uuid: string;
    file_extension_id: number;
    file_prefix_id: number;
    width: number;
    height: number;
    license_code: string;
    attribution: string;
    license_name: string;
    license_url: string;
    type: string;
    square_url: string;
    thumb_url: string;
    small_url: string;
    medium_url: string;
    large_url: string;
}

export interface Sighting {
    id: number;
    observed_on: string;
    description: string;
    latitude: string;
    longitude: string;
    map_scale?: number | null;
    timeframe?: any;
    species_guess: string;
    user_id: number;
    taxon_id?: number;
    created_at: Date | string;
    updated_at: Date | string;
    place_guess: string;
    id_please: boolean;
    observed_on_string: string;
    iconic_taxon_id?: number;
    num_identification_agreements: number;
    num_identification_disagreements: number;
    time_observed_at?: Date | string;
    time_zone: string;
    location_is_exact: boolean;
    delta: boolean;
    positional_accuracy?: number | null;
    private_latitude?: any;
    private_longitude?: any;
    geoprivacy?: any;
    quality_grade: string;
    positioning_method: string | null;
    positioning_device: string | null;
    out_of_range?: any;
    license: string;
    uri: string;
    observation_photos_count: number;
    comments_count: number;
    zic_time_zone: string;
    oauth_application_id?: number | null;
    observation_sounds_count: number;
    identifications_count: number;
    captive: boolean;
    community_taxon_id?: any;
    site_id: number;
    old_uuid?: any;
    public_positional_accuracy?: number | null;
    mappable: boolean;
    cached_votes_total: number;
    last_indexed_at: Date | string;
    private_place_guess?: any;
    uuid: string;
    taxon_geoprivacy: string | null;
    tag_list: string[];
    short_description: string;
    user_login: string;
    iconic_taxon_name: string;
    faves_count: number;
    created_at_utc: Date | string;
    updated_at_utc: Date | string;
    time_observed_at_utc?: Date | string;
    owners_identification_from_vision?: boolean;
    taxon: Taxon;
    iconic_taxon: IconicTaxon;
    user: User;
    photos: Photo[];
}


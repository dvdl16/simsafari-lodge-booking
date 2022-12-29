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
    user_icon_url: string;
}

export interface Photo {
    id: number;
    user_id: number;
    native_photo_id: string;
    created_at: Date;
    updated_at: Date;
    native_page_url: string;
    native_username: string;
    native_realname: string;
    license: number;
    subtype: string;
    native_original_image_url: string;
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
    map_scale?: number;
    timeframe?: any;
    species_guess: string;
    user_id: number;
    taxon_id?: number;
    created_at: Date;
    updated_at: Date;
    place_guess: string;
    id_please: boolean;
    observed_on_string: string;
    iconic_taxon_id?: number;
    num_identification_agreements: number;
    num_identification_disagreements: number;
    time_observed_at?: Date;
    time_zone: string;
    location_is_exact: boolean;
    delta: boolean;
    positional_accuracy?: number;
    private_latitude?: any;
    private_longitude?: any;
    geoprivacy?: any;
    quality_grade: string;
    positioning_method: string;
    positioning_device: string;
    out_of_range?: any;
    license: string;
    uri: string;
    observation_photos_count: number;
    comments_count: number;
    zic_time_zone: string;
    oauth_application_id?: number;
    observation_sounds_count: number;
    identifications_count: number;
    captive: boolean;
    community_taxon_id?: any;
    site_id: number;
    old_uuid?: any;
    public_positional_accuracy?: number;
    mappable: boolean;
    cached_votes_total: number;
    last_indexed_at: Date;
    private_place_guess?: any;
    uuid: string;
    taxon_geoprivacy: string;
    tag_list: string[];
    short_description: string;
    user_login: string;
    iconic_taxon_name: string;
    faves_count: number;
    created_at_utc: Date;
    updated_at_utc: Date;
    time_observed_at_utc?: Date;
    owners_identification_from_vision?: boolean;
    taxon: Taxon;
    iconic_taxon: IconicTaxon;
    user: User;
    photos: Photo[];
}


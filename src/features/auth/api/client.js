
import { createClient } from '@supabase/supabase-js'
import axios from 'axios';
import END_POINTS from '../../../constants/endpoints';

const supabaseUrl = 'https://dntrafhsfjpkvnztvpao.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRudHJhZmhzZmpwa3ZuenR2cGFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM4NTk1OTEsImV4cCI6MjAxOTQzNTU5MX0.z7N036slY5645Yf-fWn9Qk3cj80vydmkp6mmp-BUDss'

const key = await axios.get(
    END_POINTS.KEY
);

export const supabaseAuth = createClient(supabaseUrl, key.data[0].key);
export const supabase = createClient(supabaseUrl, supabaseKey);
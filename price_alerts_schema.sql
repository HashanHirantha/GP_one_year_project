-- price_alerts_schema.sql
CREATE TABLE price_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    phone_number VARCHAR(20) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE price_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert price alerts"
    ON price_alerts FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Anyone can view price alerts"
    ON price_alerts FOR SELECT
    USING (true);

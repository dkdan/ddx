/*
  # Initial Schema Setup

  1. New Tables
    - `wallets`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `naira_balance` (numeric)
      - `btc_balance` (numeric)
      - `eth_balance` (numeric)
      - `usdt_balance` (numeric)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `transactions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `type` (text - deposit, withdrawal, bill_payment, conversion)
      - `amount` (numeric)
      - `currency` (text - NGN, BTC, ETH, USDT)
      - `status` (text - pending, completed, failed)
      - `description` (text)
      - `created_at` (timestamp)
      
    - `bill_payments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `transaction_id` (uuid, references transactions)
      - `provider` (text)
      - `service_type` (text - airtime, data, electricity, etc.)
      - `recipient` (text)
      - `amount` (numeric)
      - `status` (text - pending, completed, failed)
      - `created_at` (timestamp)
      
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access only their own data
*/

-- Create wallets table
CREATE TABLE IF NOT EXISTS wallets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  naira_balance numeric DEFAULT 0,
  btc_balance numeric DEFAULT 0,
  eth_balance numeric DEFAULT 0,
  usdt_balance numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  type text NOT NULL,
  amount numeric NOT NULL,
  currency text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create bill_payments table
CREATE TABLE IF NOT EXISTS bill_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  transaction_id uuid REFERENCES transactions NOT NULL,
  provider text NOT NULL,
  service_type text NOT NULL,
  recipient text NOT NULL,
  amount numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bill_payments ENABLE ROW LEVEL SECURITY;

-- Create policies for wallets
CREATE POLICY "Users can view their own wallet"
  ON wallets
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own wallet"
  ON wallets
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for transactions
CREATE POLICY "Users can view their own transactions"
  ON transactions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own transactions"
  ON transactions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create policies for bill_payments
CREATE POLICY "Users can view their own bill payments"
  ON bill_payments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bill payments"
  ON bill_payments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create a function to create a wallet for new users
CREATE OR REPLACE FUNCTION public.create_wallet_for_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.wallets (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to call the function when a new user is created
CREATE TRIGGER create_wallet_after_user_signup
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.create_wallet_for_new_user();
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export const PaymentForm = ({
  priceId,
  fields,
  successUrl,
  quantity = 1,
}: {
  priceId?: string;
  fields: {
    name: string;
    type?: string;
    required?: boolean;
    label: string;
  }[];
  successUrl: string;
  quantity?: number;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Record<string, string>>(
    fields.reduce(
      (acc, field) => ({ ...acc, [field.name]: "" }),
      {} as Record<string, string>,
    ),
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error("The card form is not loaded.");
      }

      const { token } = await stripe.createToken(cardElement);

      if (!token) {
        throw new Error("Error creating token");
      }

      const response = await fetch("/api/checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId,
          token: token.id,
          quantity,
          ...formData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        location.href = successUrl;
      } else {
        setError(data.error || "Error processing payment");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unknown error during payment",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!priceId) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 3, display: "flex", flexDirection: "column", gap: 2 }}>
        {fields
          .filter(({ type }) => type === "text")
          .map(({ name, type, required, label }) => (
            <TextField
              key={name}
              type={type}
              name={name}
              required={required}
              fullWidth
              label={label}
              value={formData[name]}
              onChange={handleInputChange}
              variant="outlined"
            />
          ))}
      </Box>

      <Box sx={{ mt: 2, mb: 4 }}>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Payment card details
        </Typography>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424242",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        disabled={!stripe || loading}
        sx={{ mb: 2 }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Pay Now"}
      </Button>
    </form>
  );
};

export interface DemoStep {
  label: string;
  content: string;
  code?: string;
  language?: string;
}

export interface DemoResponse {
  question: string;
  steps: DemoStep[];
  finalAnswer: string;
}

export const demoResponses: DemoResponse[] = [
  {
    question: "What percentage of loans in our portfolio have a debt-to-income ratio above 40%?",
    steps: [
      {
        label: "Query Decomposition",
        content: "Identified as a pure SQL aggregation query over structured loan data.",
        code: `sub_queries = [
  "Filter loans WHERE dti_ratio > 0.40",
  "Count filtered vs total records",
  "Compute percentage"
]
data_source = "loan_portfolio_db"
retrieval_needed = False`,
        language: "python",
      },
      {
        label: "Text Retrieval",
        content: "No relevant unstructured documents found. Proceeding with SQL-only path.",
        code: `vector_search("debt-to-income ratio threshold")
→ No relevant regulatory passages found
→ Routing to SQL-only execution path`,
        language: "text",
      },
      {
        label: "SQL Generation",
        content: "Generated precise SQL query against loan portfolio database.",
        code: `SELECT
  ROUND(
    COUNT(*) FILTER (WHERE dti_ratio > 0.40) * 100.0
    / COUNT(*),
    2
  ) AS pct_high_dti,
  COUNT(*) FILTER (WHERE dti_ratio > 0.40) AS high_dti_count,
  COUNT(*) AS total_loans
FROM loan_portfolio
WHERE reporting_date = CURRENT_DATE;`,
        language: "sql",
      },
      {
        label: "Answer Synthesis",
        content: "SQL executed successfully. Cross-validating with portfolio metadata.",
        code: `result = {
  "pct_high_dti": 23.7,
  "high_dti_count": 1842,
  "total_loans": 7773
}
confidence = "high"  # exact computation
sources = ["loan_portfolio_db"]`,
        language: "python",
      },
    ],
    finalAnswer:
      "**23.7%** of loans in your portfolio have a debt-to-income ratio above 40%, representing **1,842 out of 7,773** total loans. This exceeds the typical regulatory threshold of 20% and warrants review under your credit policy.",
  },
  {
    question: "Compare the revenue growth of our top 5 clients over the last 3 quarters",
    steps: [
      {
        label: "Query Decomposition",
        content: "Multi-hop query: requires ranking clients by revenue, then computing growth rates.",
        code: `sub_queries = [
  "Identify top 5 clients by total revenue",
  "Retrieve quarterly revenue: Q1, Q2, Q3",
  "Compute QoQ growth rates for each client"
]
data_source = "crm_financials_db"
requires_join = True`,
        language: "python",
      },
      {
        label: "Text Retrieval",
        content: "Found 2 relevant passages from client contract amendments affecting revenue recognition.",
        code: `→ "Acme Corp contract amendment Q2 2024"
  Relevance: 0.87 — revenue reclassification note
→ "Nexus Financial SLA terms Q3"
  Relevance: 0.72 — performance bonus accrual
→ Passing context to synthesis step`,
        language: "text",
      },
      {
        label: "SQL Generation",
        content: "Generated multi-CTE query with ranking and growth calculation.",
        code: `WITH ranked_clients AS (
  SELECT client_id, SUM(revenue) AS total_rev
  FROM revenue_data
  GROUP BY client_id
  ORDER BY total_rev DESC LIMIT 5
),
quarterly AS (
  SELECT r.client_id, c.client_name,
    SUM(CASE WHEN quarter = 'Q1' THEN revenue END) AS q1,
    SUM(CASE WHEN quarter = 'Q2' THEN revenue END) AS q2,
    SUM(CASE WHEN quarter = 'Q3' THEN revenue END) AS q3
  FROM revenue_data r
  JOIN ranked_clients rc USING (client_id)
  JOIN clients c USING (client_id)
  GROUP BY 1, 2
)
SELECT *,
  ROUND((q2 - q1) / q1 * 100, 1) AS q1_to_q2_pct,
  ROUND((q3 - q2) / q2 * 100, 1) AS q2_to_q3_pct
FROM quarterly ORDER BY q3 DESC;`,
        language: "sql",
      },
      {
        label: "Answer Synthesis",
        content: "Combining SQL results with document context for Acme Corp note.",
        code: `Note: Acme Corp Q2 revenue includes one-time
reclassification per contract amendment.
Adjusted growth rate: +8.2% (vs. reported +21.4%)
Confidence: high (with annotation)`,
        language: "text",
      },
    ],
    finalAnswer:
      "**Top 5 client revenue growth (last 3 quarters):**\n\n| Client | Q1→Q2 | Q2→Q3 |\n|---|---|---|\n| Nexus Financial | +12.3% | +8.7% |\n| Acme Corp* | +21.4% | +4.1% |\n| Meridian Bank | +6.8% | +11.2% |\n| Atlas Holdings | +3.1% | +9.4% |\n| Crestwood AG | +15.7% | +2.9% |\n\n*Acme Corp Q2 includes a one-time revenue reclassification per contract amendment.",
  },
  {
    question: "Which counterparties exceed the large exposure limit under CRR Article 395?",
    steps: [
      {
        label: "Query Decomposition",
        content: "Regulatory query: requires both document retrieval (CRR threshold) and SQL (exposure data).",
        code: `sub_queries = [
  "Retrieve CRR Article 395 large exposure limit",
  "Get own funds (Tier 1 + Tier 2 capital)",
  "Query counterparty exposures",
  "Filter exposures > 25% of own funds"
]
retrieval_needed = True  # regulatory document needed`,
        language: "python",
      },
      {
        label: "Text Retrieval",
        content: "Found the relevant CRR Article 395 passage defining the 25% threshold.",
        code: `→ CRR Article 395(1): "An institution shall not incur
  an exposure [...] to a client or group of connected
  clients the value of which exceeds 25% of its
  eligible capital."
  Relevance: 0.98 — exact regulatory definition
→ Eligible capital = Tier 1 + Tier 2 capital`,
        language: "text",
      },
      {
        label: "SQL Generation",
        content: "Generated query using retrieved threshold against exposure database.",
        code: `WITH capital AS (
  SELECT SUM(amount) AS eligible_capital
  FROM regulatory_capital
  WHERE capital_type IN ('Tier1', 'Tier2')
    AND reporting_date = '2024-03-31'
),
exposures AS (
  SELECT
    counterparty_id,
    counterparty_name,
    SUM(exposure_value) AS total_exposure,
    SUM(exposure_value) / (SELECT eligible_capital FROM capital) * 100
      AS pct_of_capital
  FROM counterparty_exposures
  WHERE reporting_date = '2024-03-31'
  GROUP BY 1, 2
)
SELECT *, eligible_capital
FROM exposures, capital
WHERE pct_of_capital > 25
ORDER BY pct_of_capital DESC;`,
        language: "sql",
      },
      {
        label: "Answer Synthesis",
        content: "2 counterparties identified. Composing regulatory alert with source citations.",
        code: `breaches = [
  {"name": "Titan RE Group", "pct": 31.2, "status": "BREACH"},
  {"name": "Orion Capital", "pct": 26.8, "status": "BREACH"}
]
regulatory_basis = "CRR Article 395(1)"
action_required = True`,
        language: "python",
      },
    ],
    finalAnswer:
      "**2 counterparties exceed the CRR Article 395 large exposure limit (25% of eligible capital):**\n\n| Counterparty | Exposure | % of Capital | Status |\n|---|---|---|---|\n| Titan RE Group | €187.3M | 31.2% | ⚠️ Breach |\n| Orion Capital | €160.9M | 26.8% | ⚠️ Breach |\n\nBasis: CRR Art. 395(1). Eligible capital: €600.4M. Immediate reporting to competent authority may be required.",
  },
];

export const getBestMatch = (question: string): DemoResponse => {
  const q = question.toLowerCase();
  if (q.includes("dti") || q.includes("debt-to-income") || q.includes("loan"))
    return demoResponses[0];
  if (q.includes("revenue") || q.includes("client") || q.includes("growth"))
    return demoResponses[1];
  if (q.includes("crr") || q.includes("counterpart") || q.includes("exposure"))
    return demoResponses[2];
  return demoResponses[0];
};

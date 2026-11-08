---
name: azure-skills
description: Microsoft Azure enterprise cloud architecture, AKS Kubernetes deployment, Azure AI Foundry SDK integration, cost optimization, and diagnostic monitoring.
---

# Microsoft Azure Cloud & AI Architecture (`microsoft/azure-skills`)

> **Priority:** `P1` | **Framework:** `microsoft/azure-skills` | **Domain:** `10-ai-infrastructure` | **Stars:** `⭐ 1.6k+`

Microsoft Azure enterprise cloud architecture, AKS Kubernetes deployment, Azure AI Foundry SDK integration, cost optimization, and diagnostic monitoring.

---

## 🧭 When to Use

* When deploying production workloads to Microsoft Azure (Azure Container Apps, App Service, AKS).
* When integrating enterprise LLM models and evaluation pipelines via Azure AI Foundry.
* When auditing enterprise cloud costs, reservation plans, and quota utilization.
* When configuring role-based access control (RBAC), managed identities, and Entra ID authentication.

---

## 🎯 Core Capabilities

1. **Azure AI Foundry**: Unified SDK and portal for deploying OpenAI, DeepSeek, and open-source models with enterprise security and SLA guarantees.
2. **AKS Kubernetes Architecture**: Automated cluster configuration, ingress routing, auto-scaling node pools, and pod identity wiring.
3. **Cost & Quota Diagnostics**: Scripts to detect idle cloud resources, right-size VMs, and forecast monthly cloud expenditure.
4. **Bicep & Terraform Infrastructure as Code (IaC)**: Reusable infrastructure definitions for compliant multi-region disaster recovery.

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# In your coding assistant session, activate this role:
/azure-skills
```

### Azure CLI Cloud Resource Deployment
```bash
# Login to enterprise tenant
az login

# Create resource group and deploy container app
az group create --name rg-ai-services --location eastus
az containerapp up \
  --name agent-gateway \
  --resource-group rg-ai-services \
  --ingress external \
  --target-port 8080 \
  --source .
```

### Python SDK for Azure AI Foundry
```python
from azure.ai.inference import ChatCompletionsClient
from azure.core.credentials import AzureKeyCredential
import os

client = ChatCompletionsClient(
    endpoint=os.environ["AZURE_INFERENCE_ENDPOINT"],
    credential=AzureKeyCredential(os.environ["AZURE_INFERENCE_CREDENTIAL"]),
)

response = client.complete(
    messages=[{"role": "user", "content": "Analyze enterprise cloud architecture requirements."}],
    model="gpt-4o",
)
print(response.choices[0].message.content)
```

---

## 📋 Prerequisites

* Azure CLI (`az`) installed
* Active Azure Subscription with appropriate RBAC permissions (Contributor / Owner)
* Python 3.9+ or Node.js 18+

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Storing Azure connection strings or client secrets in plain text instead of using Azure Key Vault and Managed Identities.
* **Anti-Pattern:** Deploying production AKS clusters without multi-availability zone redundancy.


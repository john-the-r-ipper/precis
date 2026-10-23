---
title: "Retrieval-Augmented Generation: Grounding LLMs in Facts"
description: "A plain-language summary of the 2020 RAG paper, which combined a retriever with a generator so language models can draw on external knowledge they were not trained on."
pubDate: 2026-10-10
category: Groundedness
tags: [rag, retrieval, grounding, facts]
author: Precis Editorial
---

Language models know a lot, but they don't know *everything* — and what they "know" is frozen at training time. The 2020 paper **"Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"** by Lewis and colleagues offered a clean solution: plug a **retriever** into the front of a **generator**, so the model can look up relevant documents as it answers. This explainer covers how RAG works and why it became one of the most widely adopted ideas in applied AI.

## The problem: parametric knowledge goes stale

A large language model stores knowledge in its weights — the parameters learned during training. Researchers call this **parametric memory**. It is powerful, but it has a hard limitation: the model can only know what was in its training data, and it cannot easily update as the world changes. Ask it about a recent event or a private document, and it will either fail or hallucinate.

The RAG paper's premise is that many useful tasks are **knowledge-intensive**: a good answer requires facts the model was never trained on. Rather than cramming all knowledge into the weights, why not let the model *retrieve* the facts it needs at the moment it needs them?

## The architecture: retriever + generator

RAG combines two components:

- **A retriever** that searches a large corpus of documents and returns the top-k most relevant passages for a given query. The paper used a dense retriever based on the DPR (Dense Passage Retrieval) approach.
- **A generator** — a sequence-to-sequence model (in the paper, a BART-style model) that produces the answer conditioned on both the query and the retrieved passages.

The two are trained together, end to end. Retrieval is non-differentiable in the discrete sense, so the paper uses a clever marginalization: the generator sums over retrieved passages (top-k via maximum inner product search) to predict the next token. In the paper's terminology, RAG-Sequence marginalizes over all retrieved passages for the entire sequence, while RAG-Token does the marginalization at each token.

## The results

The paper evaluated RAG on several knowledge-intensive benchmarks. On open-domain question answering (Natural Questions, WebQuestions, CuratedTREC) and abstractive question answering (MS-MARCO), RAG set new state-of-the-art scores. The authors also ran a "parametric-only" ablation (generator without retrieval), and retrieval consistently helped — evidence that the retrieved knowledge was doing real work.

Two other results are worth highlighting. RAG is **trainable in an end-to-end fashion**, so it can be fine-tuned for a domain. And because the corpus is external, you can update it — swap in newer documents, or a private knowledge base — without retraining the model's weights. That is the property that would make RAG indispensable in production systems.

## Why it matters

RAG is the foundation of an entire class of practical AI systems: chatbots that answer from a company's own documentation, search engines that summarize with citations, and domain assistants that must stay current. Its dual benefits are exactly the ones the paper demonstrated: **accuracy** (grounding reduces hallucination) and **freshness** (update the corpus, not the weights).

It is also a genuinely important architectural idea: instead of treating all knowledge as something to be memorized, RAG treats retrieval as a first-class part of generation. This distinction — parametric versus non-parametric knowledge — is central to how modern AI applications are built. In applied settings, systems that combine a retriever with a generator are now among the most common production AI patterns.

## The bottom line

RAG showed that giving a language model the ability to retrieve external information makes it dramatically better at knowledge-intensive tasks, while keeping its knowledge updatable. It is the canonical "grounding" technique and a cornerstone of applied AI.

## Sources

<div class="source-list">
- Lewis, P., Perez, E., Piktus, A., et al. (2020). *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks*. arXiv:2005.11401. — <a href="https://arxiv.org/abs/2005.11401">https://arxiv.org/abs/2005.11401</a>
- Benchmark results and the RAG-Sequence/RAG-Token variants are as defined in the paper.
</div>

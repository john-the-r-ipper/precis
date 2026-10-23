---
title: "BERT: How Pre-training Gave Every Model a Running Start"
description: "A plain-language summary of the 2018 BERT paper, which showed that pre-training a Transformer on unlabeled text could transfer surprisingly well to many specific language tasks."
pubDate: 2026-09-19
category: Foundations
tags: [bert, pretraining, transfer-learning, nlp]
author: Precis Editorial
---

In 2018, a short paper titled **"BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding"** by Devlin and colleagues changed how natural language processing (NLP) is done. BERT stood for *Bidirectional Encoder Representations from Transformers*, and its core argument was simple: if you train a large Transformer on a huge amount of unlabeled text, that single pre-trained model can then be fine-tuned to perform remarkably well on many specific tasks. This explainer breaks down what BERT did and why it mattered.

## The problem it solved

Before BERT, most NLP models were trained from scratch for each task — a named-entity recognizer, a question answerer, and a sentiment classifier each needed their own model, their own data, and their own training run. Building enough labeled data for every task was expensive, and models trained on small datasets struggled to generalize.

What if you could first learn the general *shape* of language from the enormous amount of free, unlabeled text on the internet, and then adapt that knowledge to a specific task with a small amount of labeled data? That is the promise of **pre-training plus fine-tuning**, and BERT was the demonstration that it worked at scale.

## The core idea: bidirectional pre-training

BERT is a Transformer encoder — the "reading" half of the architecture we covered in [our Transformer explainer](/blog/attention-is-all-you-need-transformer/). Its distinctive feature is that it is **bidirectional**: it reads each word in context of the words on *both* sides, not just the ones before it. This matters, because the meaning of a word often depends on what follows it.

To pre-train, BERT learned from two unsupervised objectives:

- **Masked language modeling (MLM):** 15% of input tokens are masked, and the model must predict the missing ones from context. This forces it to build rich, two-directional representations.
- **Next sentence prediction (NSP):** the model predicts whether a pair of sentences are consecutive, teaching it about relationships between sentences.

The paper reports a few concrete scale figures: BERT-base had 110 million parameters, and BERT-large had 340 million. Pre-training used the BooksCorpus (800 million words) and English Wikipedia (2,500 million words). Training BERT-base on 16 TPU chips took about 4 days.

## Fine-tuning: small change, big payoff

The headline result is in how little work is needed to adapt BERT. For each target task, you add a small task-specific layer on top of the pre-trained model and fine-tune on the task's labeled data. The paper shows this is surprisingly cheap — fine-tuning for most tasks took at most a few hours on a single GPU.

That is the "transfer learning" payoff: the expensive, general learning happens once, on unlabeled data, and then gets reused across many tasks. The paper reported state-of-the-art results across eleven NLP tasks, including question answering (SQuAD), natural language inference, and named-entity recognition.

## Why it mattered

BERT helped establish a template that the whole field adopted. Today, nearly every serious language system starts from a pre-trained foundation model and fine-tunes or prompts it — instead of learning from scratch. BERT also showed that the *architecture* (a bidirectional Transformer encoder) and the *training objective* together determine what a model learns, and that unsupervised pre-training could carry most of the burden.

Two caveats are worth keeping in mind. First, BERT is an *encoder* — it is built for understanding tasks (classification, extraction, matching) rather than open-ended generation. Second, its bidirectional masking makes training more complicated than the left-to-right "next token" objective used by generative models, a trade-off later generative models addressed differently.

## What came after

The pre-train-then-fine-tune recipe paved the way for a line of models — RoBERTa, ALBERT, DistilBERT, and beyond — and for the eventual shift toward ever-larger generative foundation models. When modern LLMs brag about being "pre-trained on massive internet text," they are continuing the strategy BERT validated.

## The bottom line

BERT proved that you could learn a powerful, general understanding of language from unlabeled text and then adapt it to specific tasks with modest labeled data. It made "pre-training" a household concept in AI and set the mold for the foundation-model era.

## Sources

<div class="source-list">
- Devlin, J., Chang, M.-W., Lee, K., & Toutanova, K. (2019). *BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding*. arXiv:1810.04805. — <a href="https://arxiv.org/abs/1810.04805">https://arxiv.org/abs/1810.04805</a>
- Model sizes, training data volumes, and fine-tuning times are as reported in the paper.
</div>

---
title: "Teaching Models to Follow Instructions: The RLHF Story"
description: "A plain-language summary of the 2022 InstructGPT paper, which showed how reinforcement learning from human feedback makes large language models more helpful and aligned."
pubDate: 2026-09-26
category: Alignment
tags: [rlhf, alignment, instructgpt, safety]
author: Precis Editorial
---

A "good" language model isn't just one that can generate fluent text — it's one that does what you ask. That turns out to be surprisingly hard, and the paper **"Training language models to follow instructions with human feedback"** (Ouyang and colleagues, 2022) is the canonical demonstration. It introduced a recipe, now known as **RLHF** (reinforcement learning from human feedback), that made OpenAI's GPT-3 into a far more helpful model called InstructGPT. This explainer covers the problem, the three-stage method, and why it matters.

## The problem: size isn't helpfulness

GPT-3, released in 2020, was a marvel of scale — but its outputs were not reliably *helpful*. Ask it a question and it might answer well, or it might ramble, repeat itself, or confidently produce nonsense. A model that has learned to predict the next token well has not necessarily learned to be useful or aligned with what a person actually wants.

The InstructGPT paper asked a concrete question: can you take a powerful pre-trained model and reshape its behavior to be more helpful, more honest, and less harmful — without destroying what makes it capable? Their answer was RLHF, a method that uses human preferences as a training signal.

## Stage 1: supervised fine-tuning

First, the team collected a dataset of demonstration data — prompt and desired-response pairs written by humans. They fine-tuned GPT-3 on these examples in the ordinary supervised way (predicting the next token). This "behavior cloning" step gets the model into the right ballpark: it starts imitating the kind of responses humans prefer. The paper's public version used 13,000 demonstration examples for this stage.

## Stage 2: training a reward model

The problem with human feedback is that it's expensive. You can't ask a person to rate every single output. So the paper trained a separate **reward model**: a network that takes a prompt and a response, and predicts a score for how much a human would prefer it.

To train the reward model, the researchers had humans compare pairs of responses to the same prompt and say which they preferred. The reward model learns to mimic those preferences. InstructGPT's public paper used 33,000 comparison pairs for this stage.

## Stage 3: reinforcement learning

Finally, the team used **reinforcement learning** — specifically Proximal Policy Optimization (PPO) — to fine-tune the language model itself. The policy (the model) generates responses, the reward model scores them, and the model is updated to produce higher-scoring responses. A term called a *KL penalty* keeps the model from drifting too far from its original behavior, preserving its general capabilities.

## The results

The paper's central claim is that RLHF worked dramatically well. In evaluations, human raters preferred InstructGPT outputs over GPT-3 outputs regardless of model size — often even the smallest InstructGPT model (1.3B parameters) was preferred over the 175B-parameter GPT-3. That was a striking illustration that alignment can matter as much as scale.

The paper also found instruct models were more truthful (higher on a truthfulness benchmark), more appropriate in refusing to answer harmful questions, and better at following explicit constraints. In short, human feedback, applied through this pipeline, moved the model toward the behaviors people actually value.

## Why it matters

RLHF became the default recipe for making capable foundation models useful and safe. Nearly every major assistant model you have used has gone through a version of this pipeline: supervised fine-tuning, preference learning, then reinforcement learning against a learned reward. The InstructGPT paper is the clearest early public account of that entire stack.

It also surfaces an honest tension. RLHF aligns a model to *what the rating humans preferred*, which is not the same as objective truth. The method improves helpfulness and reduces obvious harms, but it inherits whatever biases and tastes are baked into the human feedback. Later research on alignment — including simpler alternatives like [Direct Preference Optimization](/blog/dpo-simpler-alignment/) — builds directly on these ideas.

## The bottom line

InstructGPT showed that a pre-trained model's behavior can be reshaped with human preference data, and that the resulting "aligned" model can be dramatically more helpful than a much larger, unaligned one. It turned RLHF into the industry-standard alignment tool.

## Sources

<div class="source-list">
- Ouyang, L., Wu, J., Jiang, X., et al. (2022). *Training language models to follow instructions with human feedback*. arXiv:2203.02155. — <a href="https://arxiv.org/abs/2203.02155">https://arxiv.org/abs/2203.02155</a>
- Dataset sizes (13,000 demonstrations, 33,000 comparisons) and evaluation results are as reported in the paper.
</div>

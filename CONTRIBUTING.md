# Contributing Guidelines

These are some helpful guidelines for contributing the the project. These guidelines were obtained from https://github.com/FSUInnovationHub/CreatorConnect with permission from the author.

## Commits

How do we remember history?

> By writing it down clearly and carefully.

One of the most sacred resources we have in our history is commit messages.
Without well-written and clear commit messages, our history looses its
context and meaning, and thus its usefulness, quite quickly.  To write good
commit messages:

- Write in **present tense, imperative mood** (like commands)
    - `Implement faster tree search algorithm in hot code`
    - `Switch regular expression implementation to FST`
    - `Fix typo in documentation for public macros, add examples`
- Keep the subject line terse and add an expanded body if necessary
- Use `*` or `-` as bullet points when needed

## Branch Types

When you are ready to work on a specific task, it is time to create a new branch that links to an issue in the tracker.

### Features

For each feature, make a new branch following the nomenclature `f/[short-desc]`. For example, `f/ui-improvements`.

### Documentation

For documentation changes, follow the nomenclature `d/[short-desc]`. For example, `d/rd-additions`.

### Bug Fixes

For branches dealing with bugs, follow the nomenclature `b/[short-desc]`. For example, `b/missing-ui-element`.

## Common Rules for all Branches

After you have committed changes to your local branch, you are ready to push those changes to the remote branch. Then, when you are ready, you should open a pull request against main. Remember to link the pull request to an existing issue in the tracker. Somebody else needs to review your changes before merging. After merging, you can feel free to delete the branch that was merged.

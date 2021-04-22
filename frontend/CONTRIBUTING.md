# Contributing to Peerdom backend

## Commit message guidelines

Having consistent commit messages helps other developers easily identifying what changes you made and scripts to process the commit history for other use cases.

[Conventional commits](https://conventionalcommits.org) have a good concept for this and its foundation is used for many tools and frameworks, like [Angular](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines) and AngularJS.

### Types

We recommend and process the following types of conventional commits:

- **chore**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **docs**: Documentation only changes
- **feat**: A new feature or an extension to an existing feature
- **fix**: A bug fix or other minor fix visible to the user
- **a11y**: All accessibility specific improvements
- **perf**: A code change that improves performance
- **refactor**: A code change without meaning to the user (re-organising code, abstracting functionality in methods, changes in architecture of modules, ...)
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests

### Scope

The scope should represent a part of the software that the commit changes.

The following is the list of supported scopes for commits that change the software:

- **tasks**

### Subject

The subject contains a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end
- describe the **what**

### Body

Just as in the subject, use the imperative, present tense: "change" not "changed" nor "changes". The body should include the motivation for the change and contrast this with previous behaviour (**why**).

### Footer

The footer should contain any information about Breaking Changes.
Breaking Changes should start with the word BREAKING CHANGE: with a space or two newlines. The rest of the commit message is then used for this.

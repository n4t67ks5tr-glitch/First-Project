# First-Project — "Catch the Falling Stars"

A small, complete 2D mobile game, built as the first step toward a bigger iOS/Android game.
Drag left/right to catch falling stars (+score) and dodge falling bombs (-life). Three
bombs and it's game over.

This is intentionally simple: the goal is to learn the full pipeline (write code → run it →
build it → eventually publish it) on something small before tackling anything complex.

## Why it's just scripts right now

This repo holds the game's **C# scripts** — the logic. A Unity project also needs an editor-
generated scene, prefabs, and settings, which are GUI-built and don't exist as clean
hand-editable text files. So the workflow is: you create the actual Unity project locally
(free download, any OS) and wire these scripts into it using the Unity Editor's GUI. Every
step below is copy-pasteable and doesn't require prior Unity experience.

## What you'll need to install (one-time)

1. **Unity Hub** — https://unity.com/download
2. Inside Unity Hub, install the latest **Unity LTS** version, and when picking modules, check:
   - iOS Build Support
   - Android Build Support
3. For iOS builds/App Store submission specifically (later, not needed to start): a **Mac**
   with **Xcode** installed, and an Apple Developer Program account ($99/year) — this is an
   Apple requirement for anyone shipping to the App Store, not a Unity limitation.
4. For Android (later): a free **Google Play Console** account ($25 one-time) when you're
   ready to publish.

You can write and test the game in Unity's Editor on Windows/Mac/Linux without any of the
store accounts — those are only needed at publishing time.

## Step-by-step setup

1. Clone this repo (or pull this branch) to your machine.
2. Open **Unity Hub → New Project → 2D (Core)**. Set the project location to a *new empty
   folder* (don't point it at this repo directly — Unity generates a lot of its own
   folders). Name it `FirstProject`.
3. Once Unity opens, in your OS file explorer copy this repo's `Assets/Scripts` folder into
   the new project's `Assets/Scripts` folder (creating it there). You should end up with
   `FirstProject/Assets/Scripts/GameManager.cs` etc.
4. Back in Unity, build the scene:
   - **Player (paddle):** GameObject → 2D Object → Sprite → Square. Rename it `Player`.
     Add components: `Box Collider 2D` (check "Is Trigger"), and the `PlayerController`
     script (drag it from Assets/Scripts onto the object). Set its **Tag** (top of the
     Inspector) to `Player` (create the tag if it doesn't exist). Position it near the
     bottom of the screen.
   - **Star prefab:** GameObject → 2D Object → Sprite → Circle. Rename it `Star`. Add a
     `Circle Collider 2D` (check "Is Trigger") and the `FallingItem` script, leaving
     `Is Bomb` unchecked. Drag it from the Hierarchy into the `Assets` folder to make it a
     prefab, then delete it from the Hierarchy.
   - **Bomb prefab:** repeat the same steps with a different color sprite, name it `Bomb`,
     and check `Is Bomb` on its `FallingItem` component.
   - **Spawner:** create an empty GameObject named `Spawner`, positioned above the top of
     the screen. Add the `ItemSpawner` script, and drag the `Star` and `Bomb` prefabs into
     its `Star Prefab` / `Bomb Prefab` fields in the Inspector.
   - **UI:** GameObject → UI → Text (two of them, for Score and Lives), and GameObject → UI
     → Panel (for the "Game Over" screen — add a button on it later for restart). Create an
     empty GameObject named `GameManager`, add the `GameManager` script, and drag the two
     Text objects and the Panel into its matching Inspector fields.
5. Press **Play** in the Editor toolbar. Drag the paddle with your mouse to catch stars and
   dodge bombs.

## Roadmap

- [x] Core game loop: movement, spawning, collisions, score/lives, game over (this commit)
- [ ] Polish: sprites/art, sound effects, restart button wired to `GameManager.RestartGame()`
- [ ] Build and test on a real iOS/Android device via Unity's Build Settings
- [ ] Apple Developer Program enrollment + App Store Connect listing (needs a Mac + Xcode)
- [ ] Google Play Console listing
- [ ] Once this ships end-to-end, grow it toward the bigger 2D/3D game idea

## Project structure

```
Assets/
  Scripts/
    GameManager.cs      — score, lives, game over state, restart
    PlayerController.cs — drag-to-move paddle (mouse + touch)
    FallingItem.cs       — falling star/bomb behavior, scoring on catch
    ItemSpawner.cs        — spawns stars/bombs at random intervals/positions
```

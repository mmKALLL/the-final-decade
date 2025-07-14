# The Final Decade

The Final Decade is a high-stakes resource management strategy game about leading an AI safety research team. It addresses a bone I have with mobile strategy games: they tend to be consistently clearable with simple heuristics.

This game on the other hand is designed to hone into the core of what makes strategic decisions interesting: they should affect things without being obvious, be asymmetric to prevent heuristics, input-random to prevent memorization, simple enough to understand at a glance, yet layered enough to make first-order optimization obviously bad.

It is a spiritual successor for an earlier prototype I made called Alignment is Hard, but written as a PWA using TS+Node instead of Dart+Flutter. The former setup brings me joy while the latter feels like a misstep at every juncture.

Play now at [https://studioesagames.com/tfd/](https://studioesagames.com/tfd/)

## How to play

The game begins by selecting three team members and two breakthroughs.

Each action takes one turn and represents one month. Between actions, your team produces resources and costs money.

You can find more details about resources and terminology from the info icons on the right side of each section. (Yes I know the positioning is off on desktop.)

At the top of the screen, actions are divided into three categories:

- **First-order actions**: Directly generate resources
- **Second-order actions**: Generate things that generate resources
- **Third-order actions**: Apply multipliers to resource generation or help fulfill win conditions

### Victory and loss conditions

1. **Primary goal**: End each year with the _yearly goal_ (at the top of the screen) completed.

   - Red text = cost
   - Blue text = requirement

2. **Secondary goal**: Avoid running out of money.

   - Use contracts (middle section) to convert resources into money

3. **Ternary goal**: Keep your **ASI outcome** above zero.

   - It increases/decreases by the value of **public unity** each turn
   - Public unity itself decreases by 1 at the end of every year
   - You also lose if trust or influence reach zero, but that is very rare

### Other advice

If you're not sure what to do, one starting point is to use first-order actions to generate the resources required by the first yearly goal.

Once you consistently pass the first year, you can start optimizing for the next one ahead of time. You win the game by making it to 2030. Good luck!

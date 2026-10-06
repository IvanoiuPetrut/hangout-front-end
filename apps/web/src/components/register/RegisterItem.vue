<template>
  <div class="form-control mb-4">
    <label class="label" for="email"><span class="label-text">Email</span></label>
    <input
      type="email"
      placeholder="Email Address"
      class="input input-bordered input-primary"
      required
      id="email"
    />
  </div>
  <div class="form-control">
    <label class="label" for="password"><span class="label-text">Password</span></label>
    <input
      type="password"
      placeholder="Password"
      class="input input-bordered input-primary"
      required
      for="passowrd"
    />
  </div>
  <div class="form-control">
    <label class="label" for="confirm-passowrd"
      ><span class="label-text">Confirm password</span></label
    >
    <input
      type="password"
      placeholder="Re-enter password"
      class="input input-bordered input-primary"
      required
      for="confirm-passowrd"
    />
  </div>
  <div class="form-control mt-6"><button class="btn btn-primary">Register</button></div>
</template>
